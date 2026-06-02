export default function CrmHome() {
  return (
    <div className="min-h-screen bg-white p-6">
      <div className="flex gap-4 items-start">

        {/* ── CRM 현황 ── */}
        <div className="w-[300px] shrink-0 rounded-lg border border-gray-200 p-5">
          <h2 className="mb-4 text-sm font-bold text-gray-800">CRM 현황</h2>

          {/* 캠페인 진행 현황 */}
          <div className="mb-5">
            <p className="mb-2.5 text-xs text-gray-500">캠페인 진행 현황</p>
            <div className="flex items-start gap-5">
              <div className="flex flex-col items-center gap-1">
                <span className="rounded bg-[#4DB87A] px-2 py-0.5 text-[10px] font-semibold text-white">진행중</span>
                <span className="text-xl font-bold text-gray-900">0</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="rounded bg-[#fb7185] px-2 py-0.5 text-[10px] font-semibold text-white">종료</span>
                <span className="text-xl font-bold text-gray-900">15</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="rounded bg-[#f97316] px-2 py-0.5 text-[10px] font-semibold text-white">중지</span>
                <span className="text-xl font-bold text-gray-900">0</span>
              </div>
            </div>
          </div>

          {/* 구분선 */}
          <div className="mb-4 border-t border-gray-100" />

          {/* 캐시 현황 */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs text-gray-500">캐시 현황</p>
              <button className="text-xs font-semibold text-[#4DB87A] hover:underline">충전하기 &gt;</button>
            </div>
            <div className="flex items-center gap-1.5 mb-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#6366f1] text-[8px] font-bold text-white">C</span>
              <span className="text-xs font-semibold text-gray-700">잔여캐시 99,299c</span>
            </div>
            <div className="space-y-0.5 text-xs text-gray-500">
              <p>· 이번 달 충전 <span className="text-gray-700">0c</span></p>
              <p>· 이번 달 지출 <span className="text-gray-700">0c</span></p>
            </div>
          </div>
        </div>

        {/* ── 어제의 CRM 지표 ── */}
        <div className="flex-1 rounded-lg border border-gray-200 p-5">
          <h2 className="mb-4 text-sm font-bold text-gray-800">어제의 CRM 지표</h2>

          <div className="grid grid-cols-3 divide-x divide-gray-200">

            {/* 구매 목적 캠페인 */}
            <div className="rounded border border-[#ef4444] px-5 py-3">
              <h3 className="mb-3 text-xs font-semibold text-gray-700">구매 목적 캠페인</h3>
              <div className="space-y-2">
                {[
                  { label: 'ROAS',   value: '0%' },
                  { label: '구매 금액', value: '0원' },
                  { label: '지출 캐시', value: '0원' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 회원가입 목적 캠페인 */}
            <div className="px-5 py-3">
              <h3 className="mb-3 text-xs font-semibold text-gray-700">회원가입 목적 캠페인</h3>
              <div className="space-y-2">
                {[
                  { label: '회원가입 전환율', value: '0%' },
                  { label: '회원가입 전환 수', value: '0건' },
                  { label: '회원가입 당 비용', value: '0원' },
                  { label: '노출 수',      value: '0건' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* APP설치 목적 캠페인 */}
            <div className="px-5 py-3">
              <h3 className="mb-3 text-xs font-semibold text-gray-400">APP설치 목적 캠페인</h3>
              <div className="space-y-2">
                {[
                  { label: 'APP설치 전환율', value: '0%' },
                  { label: 'APP설치 수',   value: '0건' },
                  { label: '지출 캐시',    value: '0원' },
                  { label: 'CPI',        value: '0원' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">{item.label}</span>
                    <span className="text-xs font-semibold text-gray-400">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
