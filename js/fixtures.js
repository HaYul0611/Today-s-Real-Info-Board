// ALEPH T04 공인 결정론 Fixtures 데이터 셋
// t04-real-information-board-public-v1/fixtures/ 공인 파일과 100% 동일한 데이터입니다.

export const FIXTURES = {
  'T04-NORMAL-D1-A': {
    fixture_id: 'T04-NORMAL-D1-A',
    description_ko: '가상 1일차 첫 정상 조회 (100 pt)',
    virtual_now: '2026-08-24T00:00:00.000Z',
    transport: { mode: 'http', status: 200 },
    payload: {
      signal_id: 'aleph-demo-index',
      normalized_value: 100,
      unit: 'pt',
      source_name: 'ALEPH 결정론 replay',
      source_url: 'https://fixtures.aleph.invalid/t04/demo-index',
      source_time: '2026-08-23T23:59:00.000Z',
      fetched_at: '2026-08-24T00:00:00.000Z',
      record_timezone: 'Asia/Seoul',
      record_date: '2026-08-24'
    }
  },

  'T04-NORMAL-D1-B': {
    fixture_id: 'T04-NORMAL-D1-B',
    description_ko: '가상 1일차 두 번째 정상 조회 (105 pt로 같은 행 원자적 갱신)',
    virtual_now: '2026-08-24T09:00:00.000Z',
    transport: { mode: 'http', status: 200 },
    payload: {
      signal_id: 'aleph-demo-index',
      normalized_value: 105,
      unit: 'pt',
      source_name: 'ALEPH 결정론 replay',
      source_url: 'https://fixtures.aleph.invalid/t04/demo-index',
      source_time: null,
      fetched_at: '2026-08-24T09:00:00.000Z',
      record_timezone: 'Asia/Seoul',
      record_date: '2026-08-24'
    }
  },

  'T04-NORMAL-D2': {
    fixture_id: 'T04-NORMAL-D2',
    description_ko: '가상 2일차 정상 조회 (120 pt, 신규 행 생성 및 전일 대비 +15)',
    virtual_now: '2026-08-25T00:00:00.000Z',
    transport: { mode: 'http', status: 200 },
    payload: {
      signal_id: 'aleph-demo-index',
      normalized_value: 120,
      unit: 'pt',
      source_name: 'ALEPH 결정론 replay',
      source_url: 'https://fixtures.aleph.invalid/t04/demo-index',
      source_time: '2026-08-24T23:59:00.000Z',
      fetched_at: '2026-08-25T00:00:00.000Z',
      record_timezone: 'Asia/Seoul',
      record_date: '2026-08-25'
    }
  },

  'T04-TIMEOUT': {
    fixture_id: 'T04-TIMEOUT',
    description_ko: '제한시간 초과 (Timeout) — 마지막 정상값 보존 및 stale 처리',
    virtual_now: '2026-08-24T10:00:00.000Z',
    transport: { mode: 'timeout', status: null },
    payload: null
  },

  'T04-AUTH-401': {
    fixture_id: 'T04-AUTH-401',
    description_ko: '외부 출처 인증 거절 (401/403) — 마지막 정상값 보존 및 stale 처리',
    virtual_now: '2026-08-24T10:01:00.000Z',
    transport: { mode: 'http', status: 401 },
    payload: { message: 'unauthorized synthetic fixture' }
  },

  'T04-RATE-429': {
    fixture_id: 'T04-RATE-429',
    description_ko: '외부 출처 호출 제한 (429 Rate Limit) — Retry-After 안내',
    virtual_now: '2026-08-24T10:02:00.000Z',
    transport: { mode: 'http', status: 429, retry_after: 60 },
    payload: { message: 'rate limited synthetic fixture' }
  },

  'T04-OFFLINE': {
    fixture_id: 'T04-OFFLINE',
    description_ko: '네트워크 연결 중단 (Offline) — 마지막 정상값 보존 및 stale 처리',
    virtual_now: '2026-08-24T10:03:00.000Z',
    transport: { mode: 'offline', status: null },
    payload: null
  },

  'T04-SCHEMA-BREAK': {
    fixture_id: 'T04-SCHEMA-BREAK',
    description_ko: '응답 형식 변경 (Schema Break) — 타입 불일치 감지',
    virtual_now: '2026-08-24T10:04:00.000Z',
    transport: { mode: 'http', status: 200 },
    payload: {
      signal_id: 'aleph-demo-index',
      normalized_value: '105', // string instead of number
      unit: 'pt',
      source_name: 'ALEPH 결정론 replay',
      source_url: 'https://fixtures.aleph.invalid/t04/demo-index',
      source_time: null,
      fetched_at: '2026-08-24T10:04:00.000Z',
      record_timezone: 'Asia/Seoul',
      record_date: '2026-08-24'
    }
  },

  'T04-RECOVER-D2': {
    fixture_id: 'T04-RECOVER-D2',
    description_ko: '오류 뒤 가상 2일차 재시도 성공 (120 pt, fresh/none 회복)',
    virtual_now: '2026-08-25T00:00:00.000Z',
    transport: { mode: 'http', status: 200 },
    payload: {
      signal_id: 'aleph-demo-index',
      normalized_value: 120,
      unit: 'pt',
      source_name: 'ALEPH 결정론 replay',
      source_url: 'https://fixtures.aleph.invalid/t04/demo-index',
      source_time: '2026-08-24T23:59:00.000Z',
      fetched_at: '2026-08-25T00:00:00.000Z',
      record_timezone: 'Asia/Seoul',
      record_date: '2026-08-25'
    }
  }
};
