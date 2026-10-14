import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
    id: number
    email: string
    name: string
    avatar: string
}

// 1. 타입 정의 부분 분석
// user: User | null
// => 로그인 상태를 표현하기 위애 만들었습니다.
//    사용자가 로그인하기 전초기 상태)에는 정보가 없으므로 null이 들어가야 합니다. 로그인이 성공하면 위에서 정의한 User 객체({ id: 1, email: "..." })가 들어갑니다.
//    즉, "아직 로그인을 안 했거나(null), 로그인한 유저 정보가 들어있거나 둘 중 하나다"라는 뜻으로 | (Union 타입)을 사용한 것입니다.

// setUser: (user: User) => void
// => 로그인 성공 시 유저 정보를 받아와서 스토어에 저장(업데이트)하는 함수의 모양(타입)을 정의한 것입니다.
//    매개변수로 User 타입의 객체를 받고, 이 함수는 실행된 뒤에 아무것도 리턴(반환)하지 않으므로 그 반환값 자리에 void를 적었습니다.

// clearAuth: () => void
// => 로그아웃 시 스토어에 저장된 유저 정보를 비워주는(초기화하는) 함수입니다.
//    매개변수가 필요 없으므로 ()는 비워두었고, 마찬가지로 무엇을 반환하는 함수가 아니므로 void를 적었습니다.

// 2. undefined, null, void의 차이점
// 프로그래밍에서 "없음"을 나타내는 개념들이지만 쓰이는 상황이 다릅니다.

// null
// => "의도적으로 값이 비어 있음을 명시"할 때 씁니다.
//    우리는 "지금은 로그인한 유저가 없다"는 것을 명확하게 표현하기 위해 user: null이라고 초기값을 설정했습니다.

// undefined
// => "값이 아예 할당되지 않았거나 존재하지 않음"을 뜻합니다.
//    자바스크립트에서 변수를 선언만 하고 값을 넣지 않으면 기본적으로 undefined가 됩니다. (우리가 의도적으로 텅 빈 상태를 만들 때는 주로 null을 선호합니다.)

// void
// => 변수 값이 아니라 "함수가 어떤 값도 반환(return)하지 않는다"는 것을 뜻하는 타입 전용 키워드입니다.
//    setUser나 clearAuth 함수는 내부의 상태만 바꾸고 끝날 뿐, 바깥으로 뭔가를 뱉어내지(return하지) 않기 때문에 리턴 타입으로 void를 지정한 것입니다.
interface AuthStore {
    user: User | null
    setUser: (user: User) => void
    clearAuth: () => void
}

// 3. () => () 이 구조는 무엇인가요?
// 자바스크립트/타입스크립트의 화살표 함수(Arrow Function) 문법과 함수의 암시적 반환(Implicit Return)이 결합된 형태입니다.
// 여기서 (set) => ({ ... }) 부분을 풀어서 쓰면 다음과 같습니다.

// - create 함수에 인자로 함수를 전달합니다. (set) => { ... }
// - 그 전달된 함수 내부에서 객체({})를 리턴해야 합니다.
// - 자바스크립트 화살표 함수에서는 중괄호 {}가 "함수의 시작"을 의미하는지, "리턴할 객체"를 의미하는지 헷갈릴 수 있습니다.
//   그래서 리턴할 객체를 소괄호 ()로 감싸주면 (() => ({ ... })), "이 소괄호 안의 객체를 그대로 반환해라"라는 뜻이 됩니다.

// 4. set 함수는 무엇인가요?
// - Zustand가 제공하는 상태 변경(업데이트) 도구입니다.
// - 리액트의 useState를 쓸 때 상태를 바꾸는 함수(setUserId 등)를 쓰듯, Zustand 스토어 안의 값을 바꾸고 싶을 때 이 set 함수를 호출합니다.
// - setUser: (user) => set({ user }) 코드를 보면,
//   새로운 user 데이터를 받아와서 set 함수에 넣어주면 Zustand가 알아서 기존 스토어의 user 값을 새 값으로 싹 바꿔줍니다.

// 5. 왜 set 함수 안에는 객체({})로 받나요?
// Zustand의 set 함수는 "현재 스토어에 들어있는 전체 상태(State) 객체 중에서, 어떤 속성만 골라서 바꿀 것인가?"를 전달받도록 설계되어 있기 때문입니다.
// 만약 스토어에 user 외에도 isLoggedIn, token 등 수많은 상태가 같이 들어있다고 상상해 보세요.
// set({ user: newUser })라고 쓰면, Zustand는 "다른 건 다 그대로 두고, 객체 안의 user 속성만 새로운 newUser로 갈아 끼워야겠구나!" 하고 이해합니다.
// 즉, Zustand 스토어는 항상 객체 형태로 상태를 관리하기 때문에, 상태를 바꿀 때도 "바꾸고 싶은 모양의 객체 조각"을 set 함수 안에 넣어주는 것입니다.
export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            setUser: (user) => set({ user }),
            clearAuth: () => set({ user: null }),
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({ user: state.user }),
            skipHydration: true,
        }
    )
)

export function clearAuthAndStorage(): void {
    useAuthStore.getState().clearAuth()
    useAuthStore.persist.clearStorage()
}
