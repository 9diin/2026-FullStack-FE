# 해결방안(Solution) 백엔드 데이터 연동 가이드

## 1. 목적과 범위

이 문서는 현재 `SolutionLayout`의 하드코딩된 화면 데이터를 백엔드 응답으로 대체할 때 필요한 데이터 구조와 연동 기준을 정의합니다. 해결방안은 독립적으로 생성되는 콘텐츠가 아니라, 같은 아이디어 구체화 결과의 `ProblemLayout` 데이터에서 확인된 문제를 실제로 줄이거나 해결하는 방안이어야 합니다.

관련 자료:

- [아이디어 구체화 진행 명세](./idea-elaboration-progress-spec.md)
- [아이디어 구체화 타입](../types/idea-detail.ts)
- [문제인식 레이아웃](../components/main/layout/problem-layout.tsx)
- [해결방안 레이아웃](../components/main/layout/solution-layout.tsx)
- [아이디어 구체화 API 클라이언트](../api/idea-generation.ts)
- [워크스페이스 상태](../store/workspace.ts)

## 2. 현재 구현에서 확인한 사항

### 2.1 문제인식

- `ProblemLayout`은 `useWorkspaceStore().problemDetail`을 구독하여 렌더링합니다.
- 현재 문제 데이터 타입에는 `ideaId`, 요약, 페르소나, 순서가 고정된 페인포인트 3개, AI 코칭이 있습니다.
- 각 페인포인트에는 화면 순서와 표시 텍스트는 있지만, 해결방안에서 안정적으로 참조할 고유 ID는 없습니다.

### 2.2 해결방안

- `SolutionLayout`은 props나 store를 받지 않고, 제목, 설명, 4개의 파이프라인 카드, AS-IS 3개 항목, TO-BE 3개 항목, 여러 지표를 컴포넌트 안에 직접 작성해 렌더링합니다.
- 화면 구조는 다음 데이터를 필요로 합니다.
  1. 해결방안 요약과 검증 상태
  2. 순서가 있는 아키텍처 파이프라인 4개: 단계명, 제목, 요약, 상세 설명, 기술/방법 배지, 지표
  3. 문제 상황(AS-IS): 사용자 관점의 불편 3개와 지표
  4. 개선 후(TO-BE): 해결 결과 3개와 지표
- 수치와 문구 중 일부는 예시성 고정값입니다. `94.8%`, `82%`, `월 3.2만 원` 등은 근거 데이터가 있을 때만 백엔드가 반환해야 하며, 샘플 문구를 실측 결과처럼 전달해서는 안 됩니다.

### 2.3 현재 API 연동 범위

- 현재 구체화 요청은 `POST /api/v1/idea-generations/{generation_id}/elaboration`에 `selected_idea_id`를 보냅니다.
- 현재 응답 타입은 문제인식 필드만 정의하고 있고, 화면도 응답을 `ProblemSectionData`로 변환합니다. 해결방안 응답의 타입, 저장 상태, 화면 바인딩은 아직 없습니다.
- 따라서 이번 데이터 계약은 기존 구체화 응답에 `solution`을 추가하는 확장안입니다. 기존 문제인식 필드와 API 흐름을 유지하고, 문제/해결방안이 같은 `elaboration_id`, `generation_id`, `selected_idea_id`에 속하도록 합니다.

## 3. 연계성 보장을 위한 데이터 원칙

1. **동일 구체화 결과에 함께 저장**: 문제인식과 해결방안은 동일 아이디어 선택에서 생성하고, 하나의 `elaboration_id`와 버전으로 조회합니다.
2. **안정적인 페인포인트 ID**: 화면의 배열 인덱스나 제목 문자열이 아니라 `pain_point_id`로 문제와 해결방안을 연결합니다. 제목이나 순서가 바뀌어도 참조가 깨지지 않아야 합니다.
3. **해결 단계의 명시적 참조**: 각 해결 파이프라인 단계는 `addresses_pain_point_ids`로 해결 대상 페인포인트를 하나 이상 참조합니다.
4. **AS-IS/TO-BE의 추적 가능성**: 각 비교 항목은 문제 ID 및 관련 해결 단계 ID를 참조해야 합니다. AS-IS는 문제인식에서 확인된 현상을 나타내고, TO-BE는 그 현상에 대응하는 개선 결과를 설명합니다.
5. **서버에서 의미 검증**: 요청의 선택 아이디어가 해당 `generation_id`에 속하는지, 모든 참조 ID가 같은 구체화 결과에 존재하는지 검증합니다. 프런트엔드가 만든 관계를 그대로 신뢰하지 않습니다.
6. **근거와 상태를 지표에 포함**: 지표는 `measured`(실측), `target`(목표), `estimate`(추정), `unknown`(미확인) 상태를 구분합니다. 근거가 없는 지표는 숫자 대신 `unknown`으로 표시하거나 생략합니다.
7. **모델의 설명과 사실을 분리**: 생성형 설명을 사용자 조사, 실험 결과, 시장 통계 등의 증거와 혼동하지 않습니다. 수치 주장에는 근거 ID 또는 명시적인 가정이 있어야 합니다.

## 4. 권장 API 계약

현재 경로를 유지하여 새 구체화 생성 및 조회 응답에 해결방안을 추가하는 방식을 권장합니다.

```http
POST /api/v1/idea-generations/{generation_id}/elaboration
GET  /api/v1/idea-generations/{generation_id}/elaboration
```

### 생성 요청

```json
{
  "selected_idea_id": "idea-fridge-vision-01"
}
```

`generation_id`는 경로에서 받고 `selected_idea_id`는 본문에서 받습니다. 서버는 해당 아이디어가 지정 generation에 실제 존재하는지 검증한 뒤 문제인식과 해결방안을 같은 결과로 생성합니다. 사용자가 수정한 문제인식/해결방안을 보존해야 하는 제품 요구가 생기면, 모델 생성 필드와 구분된 별도의 수정 요청 계약을 설계합니다. 생성 결과 전체를 클라이언트가 다시 보내 권위 데이터로 삼는 방식은 피합니다.

### 응답 계약 예시

기존 문제인식 응답 필드는 유지하고, 최상위 `solution` 필드를 추가합니다. 아래 텍스트와 데이터는 구조 예시이며 수치와 성능 주장은 백엔드가 실제 근거를 보유한 경우에만 반환해야 합니다.

```json
{
  "elaboration_id": "elab_01JEXAMPLE",
  "generation_id": "gen_01JEXAMPLE",
  "selected_idea_id": "idea-fridge-vision-01",
  "schema_version": "2.0",
  "created_at": "2026-10-16T00:00:00Z",
  "title": "냉장고 잔여 식재료 기반 레시피 및 장보기 서비스",
  "summary": "문제인식 요약",
  "persona": {
    "title": "1인 가구 직장인",
    "description": "사용자 조사에 근거한 페르소나 설명",
    "evidence_points": ["근거 1", "근거 2", "근거 3"]
  },
  "pain_point_cycle": [
    {
      "pain_point_id": "pp-overbuy",
      "order": 1,
      "step": "단계 ①",
      "step_name": "강제구매",
      "title": "대용량 번들 포장",
      "description": "소포장 부재로 필요한 양보다 많이 구매",
      "highlight_tag": "초과 비축 발생"
    },
    {
      "pain_point_id": "pp-forget",
      "order": 2,
      "step": "단계 ②",
      "step_name": "방치망각",
      "title": "냉장고 재고 망각",
      "description": "보유 식재료 파악이 어려워 재료를 장기간 방치",
      "highlight_tag": "방치 기간 근거가 있으면 표시"
    },
    {
      "pain_point_id": "pp-waste",
      "order": 3,
      "step": "단계 ③",
      "step_name": "폐기손실",
      "title": "식재료 폐기",
      "description": "재료를 제때 소비하지 못해 폐기하고 배달로 회귀",
      "highlight_tag": "폐기 손실 근거가 있으면 표시"
    }
  ],
  "ai_coaching": {
    "solution_evidence": "문제 데이터와 근거를 종합한 솔루션 도출 설명",
    "feedback_review": "검증되지 않은 성과는 목표 또는 추가 검증 항목으로 구분한 코칭"
  },
  "solution": {
    "summary": "재고 인식부터 소비 유도와 데이터 환류까지 연결하는 해결방안 요약",
    "validation": {
      "status": "unknown",
      "score": null,
      "label": "검증 상태 미확인",
      "evidence_ids": []
    },
    "pipeline": [
      {
        "solution_step_id": "sol-inventory",
        "order": 1,
        "category": "비전 센싱",
        "title": "식재료 자동 인식",
        "subtitle": "냉장고 내 재료와 소비기한 구조화",
        "description": "이미지 입력으로 보유 식재료를 등록하고 사용자가 결과를 확인·수정할 수 있게 합니다.",
        "technology_label": "온디바이스 비전 모델",
        "addresses_pain_point_ids": ["pp-forget", "pp-waste"],
        "metrics": [
          {
            "label": "인식 정확도",
            "value": null,
            "unit": "%",
            "status": "unknown",
            "basis": null,
            "evidence_ids": []
          }
        ]
      },
      {
        "solution_step_id": "sol-recipe",
        "order": 2,
        "category": "레시피 추천",
        "title": "잔여 재료 우선 레시피",
        "subtitle": "소비기한 임박 재료를 우선 활용",
        "description": "보유 재료, 조리 시간과 사용자 제약을 반영해 실행 가능한 레시피를 제안합니다.",
        "technology_label": "검색 기반 추천",
        "addresses_pain_point_ids": ["pp-forget", "pp-waste"],
        "metrics": []
      },
      {
        "solution_step_id": "sol-commerce",
        "order": 3,
        "category": "커머스 연동",
        "title": "부족 재료 최소 구매",
        "subtitle": "레시피에 필요한 부족분만 연결",
        "description": "재고에 없는 재료를 구분하고 이용 가능한 구매 수단으로 안내합니다.",
        "technology_label": "커머스 API",
        "addresses_pain_point_ids": ["pp-overbuy"],
        "metrics": []
      },
      {
        "solution_step_id": "sol-feedback",
        "order": 4,
        "category": "데이터 환류",
        "title": "소비 결과 기반 개선",
        "subtitle": "사용·폐기 결과로 추천 품질 개선",
        "description": "사용자가 동의한 소비 결과를 활용해 재고와 추천을 갱신합니다.",
        "technology_label": "동의 기반 분석",
        "addresses_pain_point_ids": ["pp-forget", "pp-waste"],
        "metrics": []
      }
    ],
    "comparison": {
      "as_is": {
        "label": "AS-IS",
        "metrics": [],
        "items": [
          {
            "item_id": "as-is-forget",
            "text": "보유 재고와 소비기한을 한눈에 확인하기 어렵습니다.",
            "pain_point_ids": ["pp-forget"]
          },
          {
            "item_id": "as-is-waste",
            "text": "재료를 적시에 활용하지 못해 폐기로 이어집니다.",
            "pain_point_ids": ["pp-waste"]
          },
          {
            "item_id": "as-is-overbuy",
            "text": "필요한 양보다 많이 구매하거나 부족 재료를 따로 조달해야 합니다.",
            "pain_point_ids": ["pp-overbuy"]
          }
        ]
      },
      "to_be": {
        "label": "TO-BE",
        "metrics": [],
        "items": [
          {
            "item_id": "to-be-inventory",
            "text": "재고와 소비기한을 등록·확인할 수 있습니다.",
            "pain_point_ids": ["pp-forget"],
            "solution_step_ids": ["sol-inventory"]
          },
          {
            "item_id": "to-be-recipe",
            "text": "남은 재료를 먼저 쓰는 조리 방안을 제안합니다.",
            "pain_point_ids": ["pp-waste"],
            "solution_step_ids": ["sol-recipe", "sol-feedback"]
          },
          {
            "item_id": "to-be-purchase",
            "text": "부족한 재료를 구분해 필요한 구매 수단으로 안내합니다.",
            "pain_point_ids": ["pp-overbuy"],
            "solution_step_ids": ["sol-commerce"]
          }
        ]
      }
    }
  }
}
```

`metrics`의 공통 항목은 `label`, `value`, `unit`, `status`, `basis`, `evidence_ids`를 권장합니다. 값이 확인되지 않은 경우 `value: null`, `status: "unknown"`으로 반환하고, UI에서 임의의 기본 수치를 만들지 않습니다. 점수 자체를 산출하지 않는 경우 `validation.score`는 `null`로 둡니다.

## 5. 데이터 검증 규칙

백엔드에서 응답을 저장하고 반환하기 전에 다음을 검증합니다.

- `selected_idea_id`가 `generation_id`에 속하고, 호출자가 해당 데이터에 접근할 권한이 있는지 확인합니다.
- `pain_point_cycle`은 화면 요구에 따라 3개이며 `order`가 1, 2, 3으로 유일하고 오름차순인지 확인합니다.
- `pain_point_id`와 `solution_step_id`는 동일 구체화 안에서 유일해야 합니다.
- 파이프라인은 `order` 기준으로 표시 가능해야 하며, 현재 UI를 그대로 사용할 경우 4단계 데이터를 반환합니다.
- 각 `addresses_pain_point_ids`가 실제 응답의 `pain_point_id`를 참조하는지 확인합니다.
- 핵심 페인포인트가 파이프라인의 어떤 해결 단계에도 연결되지 않았다면 결과를 완료 처리하지 말고, 재생성 또는 검토 필요 상태로 처리합니다.
- AS-IS 항목의 `pain_point_ids`, TO-BE 항목의 `pain_point_ids` 및 `solution_step_ids`가 각각 존재하는 ID를 가리키는지 확인합니다.
- 각 TO-BE 항목은 한 개 이상의 관련 문제 ID와 해결 단계 ID를 함께 가져야 합니다.
- 생성된 문장에 포함된 KPI와 배지 지표는 동일한 주장에 대해 서로 모순되지 않아야 하며, 지표 단위·기간·산출 기준을 확인합니다.
- 근거가 제공되지 않은 정량 수치, 모델 성능, 배송 보장, 심사 통과율, 절감액은 사실로 반환하지 않습니다.
- 임의로 잘린 문자열 대신 필드별 최대 길이와 허용 항목 수를 API 스키마에 정의하고 위반 시 명시적인 검증 오류를 반환합니다.

## 6. 프런트엔드 바인딩 시 고려사항

백엔드 응답 확장만으로 현재 `SolutionLayout`이 자동으로 동적화되지는 않습니다. 프런트엔드 연동 작업에서는 다음 변경이 함께 필요합니다.

1. `types/idea-detail.ts`에 백엔드 `solution` DTO와 화면용 솔루션 타입을 추가합니다.
2. 응답 파서에서 `solution.pipeline`, 비교 항목, ID 관계와 지표 상태를 검증합니다. 타입 단언만으로 백엔드 JSON을 신뢰하지 않습니다.
3. 워크스페이스 상태에 현재 선택 아이디어의 문제인식 및 해결방안을 같은 구체화 결과로 저장하고, 선택 아이디어 변경 시 오래된 해결방안이 남지 않도록 초기화/교체합니다.
4. `SolutionLayout`에 타입이 지정된 데이터를 전달하거나 같은 store를 구독하도록 바꾸고, 컴포넌트 내 하드코딩된 카드 문구와 수치를 응답 필드로 대체합니다.
5. 4단계 파이프라인 및 비교 항목 3개가 로딩/오류/미확인 상태에서도 깨지지 않도록 상태 UI를 정의합니다. 숫자가 없으면 배지를 숨기거나 “미확인”으로 표시하고 성공 지표처럼 꾸미지 않습니다.
6. 화면에서 관계를 표현할 경우, 해결 단계가 참조하는 문제 ID를 기반으로 관련 페인포인트를 표시합니다. 배열 순서나 문구 유사도에 의존해 연결을 추론하지 않습니다.

`ProblemLayout`과 `SolutionLayout`의 생성 결과는 동일한 `elaboration_id`에 속해야 합니다. 로딩 중에도 문제와 무관한 이전 아이디어의 해결방안이 잠깐 노출되지 않도록 두 섹션을 원자적으로 교체하거나 해당 구체화 결과의 상태를 함께 확인합니다.

## 7. 백엔드 인수 기준

- 동일한 구체화 ID로 문제인식, 해결방안, ID 관계를 함께 조회할 수 있습니다.
- 선택되지 않았거나 다른 generation에 속한 아이디어 ID로 구체화 결과를 생성할 수 없습니다.
- 모든 파이프라인 단계가 해결 대상 페인포인트를 ID로 참조합니다.
- TO-BE 각 항목이 관련 문제 ID와 실제 해결 단계 ID를 모두 참조합니다.
- 누락되거나 잘못된 참조, 중복 ID, 잘못된 순서에 대해 명확한 4xx 또는 서버 검증 오류를 반환하며 불완전한 성공 응답으로 감추지 않습니다.
- 근거가 없는 점수/수치/성과는 응답에서 성공 실적처럼 표현되지 않습니다.
- 기존 문제인식 응답 소비자가 깨지지 않도록 새 필드는 호환 가능한 방식으로 도입하고, 스키마 버전을 명시합니다.
- 생성 및 조회 API 테스트에서 정상 응답뿐 아니라 잘못된 문제 ID 연결, 누락된 해결 커버리지, 근거 없는 지표 상태를 검증합니다.

## 8. 프런트엔드 구현 기준

아이디어 구체화 API 라우터가 제공하는 `POST` 및 `GET /api/v1/idea-generations/{generation_id}/elaboration`을 사용합니다. 구체화 생성 요청은 기존대로 `selected_idea_id`만 전달하며, 문제인식과 해결방안은 한 번의 응답으로 받아 같은 구체화 결과로 저장합니다.

프런트엔드는 이 계약에 대해 다음을 적용합니다.

- 구체화 응답을 `unknown`으로 받고 런타임 검증을 수행한 후 화면 상태로 변환합니다.
- 문제인식의 3개 페인포인트와 해결방안의 4개 파이프라인 단계, AS-IS/TO-BE 각 3개 항목을 화면 구조와 일치하는 개수와 순서로 검사합니다.
- `pain_point_id`, `solution_step_id`, `addresses_pain_point_ids`, 비교 항목 참조 ID의 유일성과 유효성을 확인합니다. 어떤 페인포인트도 파이프라인에서 해결되지 않거나 TO-BE가 해결 단계에 연결되지 않으면 응답을 거부합니다.
- 요청한 generation 및 선택 아이디어와 응답 ID가 일치하는지 확인합니다.
- 검증이 끝난 응답만 상태에 반영하고, `SolutionLayout`은 해결 단계·지표·문제 참조 및 AS-IS/TO-BE 비교 데이터를 응답에서 렌더링합니다.
- 실측 지표에는 근거 ID를 요구하고, 근거가 없는 숫자나 검증 점수를 더미 값으로 보충하지 않습니다.
- 해결방안이 없는 과거 구체화 데이터에 대한 GET 409 및 응답 검증 실패를 성공 데이터로 대체하지 않고 오류로 표시합니다.

현재 프런트엔드는 4개 파이프라인 단계와 양쪽 비교 항목 3개를 필수로 기대합니다. 백엔드가 다른 개수 또는 필드명을 제공할 경우, UI를 임의 기본값으로 채우지 말고 API 스키마와 프런트엔드 DTO를 함께 변경해야 합니다.
