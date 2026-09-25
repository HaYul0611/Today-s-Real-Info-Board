import { InformationBoardState, calculateComparison, kstDate } from '../js/app.js';
import { FIXTURES } from '../js/fixtures.js';

console.log('========================================================');
console.log('   T04 오늘의 진짜 정보판 — 공인 검증 테스트');
console.log('========================================================\n');

const state = new InformationBoardState();
let passCount = 0;
const total = 10;

function assert(condition, message) {
  if (condition) {
    console.log(`✅ [PASS] ${message}`);
    passCount++;
  } else {
    console.error(`❌ [FAIL] ${message}`);
  }
}

// 1. D1-A 테스트
const d1a = FIXTURES['T04-NORMAL-D1-A'].payload;
state.recordSuccess(d1a, d1a);
assert(state.dailyReadings.length === 1 && state.dailyReadings[0].normalized_value === 100, 'T04-C04~C10: D1-A 1일차 100 pt 정상 등록');

// 2. D1-B 테스트 (같은 날 중복 호출 -> 1건 원자적 갱신)
const d1b = FIXTURES['T04-NORMAL-D1-B'].payload;
state.recordSuccess(d1b, d1b);
assert(state.dailyReadings.length === 1 && state.dailyReadings[0].normalized_value === 105, 'T04-C20: D1-B 동일 날짜 재실행 시 1건 원자적 갱신 (105 pt)');

// 3. D2 테스트 (다음 날짜 호출 -> 2건 생성, 어제 대비 +15)
const d2 = FIXTURES['T04-NORMAL-D2'].payload;
state.recordSuccess(d2, d2);
assert(state.dailyReadings.length === 2 && state.dailyReadings[1].normalized_value === 120, 'T04-C21: D2 익일 호출 시 신규 일별 행 추가 (120 pt)');
assert(state.lastComparison.magnitude === 15 && state.lastComparison.direction === 'increase', 'T04-C24: 어제 대비 변화값 엄격 재계산 (+15 pt)');

// 4. 장애 5종 테스트 (마지막 정상값 120 보존 및 stale 플래그)
const failures = ['timeout', 'auth', 'rate_limit', 'offline', 'schema_error'];
let failPreserved = true;
for (const f of failures) {
  state.recordError(f);
  if (state.lastGoodReading?.normalized_value !== 120 || state.status.freshness !== 'stale') {
    failPreserved = false;
  }
}
assert(failPreserved, 'T04-C12~C18: 5대 장애 발생 시 직전 정상값(120 pt) 온전히 보존 및 stale 배지 부여');

// 5. 복구 테스트 (RECOVER-D2)
const recover = FIXTURES['T04-RECOVER-D2'].payload;
state.recordSuccess(recover, recover);
assert(state.status.freshness === 'fresh' && state.status.error_code === 'none', 'T04-C19: 오류 뒤 재시도 시 fresh / none 복구 완료');

// 6. 서로 다른 실제 2일차 대조 테스트 (C22~C24)
const real1 = {
  signal_id: 'seoul-current-temp',
  normalized_value: 19.5,
  unit: '°C',
  source_name: 'Open-Meteo',
  source_url: 'https://api.open-meteo.com/v1/forecast',
  source_time: '2026-09-24T12:00:00.000+09:00',
  fetched_at: '2026-09-24T12:00:00.000+09:00',
  record_timezone: 'Asia/Seoul',
  record_date: '2026-09-24'
};
const real2 = {
  signal_id: 'seoul-current-temp',
  normalized_value: 17.9,
  unit: '°C',
  source_name: 'Open-Meteo',
  source_url: 'https://api.open-meteo.com/v1/forecast',
  source_time: '2026-09-25T02:00:00.000+09:00',
  fetched_at: '2026-09-25T02:00:00.000+09:00',
  record_timezone: 'Asia/Seoul',
  record_date: '2026-09-25'
};
const realState = new InformationBoardState();
realState.recordSuccess(real1);
realState.recordSuccess(real2);
assert(realState.dailyReadings.length === 2 && realState.dailyReadings[0].record_date !== realState.dailyReadings[1].record_date, 'T04-C22: 서로 다른 실제 2일 기록 보존');
assert(realState.lastComparison.signed === -1.6, 'T04-C24: 실제 이틀 변화량 재계산 (17.9 - 19.5 = -1.6 °C)');

console.log('\n--------------------------------------------------------');
console.log(`테스트 완료: ${passCount} 통과`);
console.log('--------------------------------------------------------');
