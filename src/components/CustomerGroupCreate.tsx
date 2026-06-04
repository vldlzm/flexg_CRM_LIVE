'use client';

type RadioOption = { label: string; green?: boolean };

const RadioRow = ({
  dot,
  options,
  defaultIdx = 0,
}: {
  dot: string;
  options: RadioOption[];
  defaultIdx?: number;
}) => (
  <div className="flex items-center gap-3 py-1">
    <span className="text-sm text-gray-500">·</span>
    <span className="w-28 shrink-0 text-sm text-gray-700">{dot}</span>
    <div className="flex items-center gap-5 flex-wrap">
      {options.map((opt, i) => (
        <label key={opt.label} className="flex items-center gap-1.5 cursor-pointer select-none">
          <span className={`inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${i === defaultIdx ? 'border-[#4DB87A]' : 'border-gray-400'}`}>
            {i === defaultIdx && <span className="h-2 w-2 rounded-full bg-[#4DB87A]" />}
          </span>
          <span className={`text-sm ${opt.green ? 'text-[#4DB87A]' : 'text-gray-700'}`}>{opt.label}</span>
        </label>
      ))}
    </div>
  </div>
);

const SectionRow = ({
  label,
  children,
  rowSpan,
}: {
  label: string;
  children: React.ReactNode;
  rowSpan?: boolean;
}) => (
  <tr className="border-b border-gray-200">
    <td className={`w-32 shrink-0 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-700 border-r border-gray-200 align-top ${rowSpan ? 'leading-loose' : ''}`}>
      {label}
    </td>
    <td className="px-6 py-3 space-y-0.5">{children}</td>
  </tr>
);

export default function CustomerGroupCreate() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 헤더 */}
      <div className="flex items-center gap-3 bg-[#2d3138] px-6 py-4 shrink-0">
        <div className="flex h-7 w-7 items-center justify-center rounded bg-white/20">
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5}>
            <circle cx="6" cy="5" r="3" />
            <path d="M1 14c0-3 2-5 5-5" strokeLinecap="round" />
            <circle cx="12" cy="10" r="3" />
            <line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" />
            <line x1="10" y1="10" x2="14" y2="10" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-white">고객 그룹 생성</h2>
      </div>

      {/* 본문 */}
      <div className="flex-1 px-8 py-6">
        {/* 그룹 제목 + 버튼 */}
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">고객 그룹 A</h3>
          <div className="flex gap-2">
            <button className="rounded-md bg-[#6b7280] px-4 py-2 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors">
              초기화
            </button>
            <button className="rounded-md bg-[#3a3f45] px-4 py-2 text-sm font-semibold text-white hover:bg-[#2d3138] transition-colors">
              그룹 추가+
            </button>
          </div>
        </div>

        {/* 조건 테이블 */}
        <div className="overflow-hidden rounded border border-gray-200">
          <table className="w-full border-collapse">
            <tbody>
              {/* 구매 */}
              <tr className="border-b border-gray-200">
                <td className="w-32 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-700 border-r border-gray-200 align-top">구매</td>
                <td className="px-6 py-3 space-y-0.5">
                  <RadioRow dot="구매기간" options={[{ label: '전체' }, { label: '최근' }, { label: '특정 기간(최대 1년)', green: true }]} />
                  <RadioRow dot="구매금액" options={[{ label: '전체' }, { label: '특정 금액' }]} />
                  <RadioRow dot="구매건수" options={[{ label: '전체' }, { label: '특정 건수' }]} />
                  {/* 구매상품 - 붉은 박스 + OR조건 가이드 */}
                  <div className="rounded border-2 border-red-400 px-3 py-1.5">
                    <RadioRow dot="구매상품" options={[{ label: '전체' }, { label: '특정 상품' }]} />
                    <p className="mt-0.5 pl-[calc(0.75rem+7rem+0.75rem)] text-xs text-red-500">
                      ※ 특정 상품 다중 선택 시 OR 조건으로 적용됩니다.
                    </p>
                  </div>
                </td>
              </tr>

              {/* 회원가입 */}
              <SectionRow label="회원가입">
                <RadioRow dot="가입기간" options={[{ label: '전체' }, { label: '최근' }, { label: '특정 기간(최대 1년)', green: true }]} />
              </SectionRow>

              {/* APP설치 */}
              <SectionRow label="APP설치">
                <RadioRow dot="설치여부" options={[{ label: '전체' }, { label: '설치' }, { label: '미설치' }]} />
                <RadioRow dot="설치시기" options={[{ label: '전체' }, { label: '최근' }, { label: '특정 기간(최대 1년)', green: true }]} />
              </SectionRow>

              {/* 방문 */}
              <SectionRow label="방문">
                <RadioRow dot="방문여부" options={[{ label: '전체' }, { label: '방문(최대 1년)', green: true }, { label: '미방문(최대 1년)', green: true }]} />
                <RadioRow dot="방문횟수" options={[{ label: '전체' }, { label: '특정 횟수' }]} />
              </SectionRow>

              {/* 관심상품 */}
              <tr>
                <td className="w-32 bg-gray-50 px-5 py-4 text-sm font-medium text-gray-700 border-r border-gray-200 align-top">
                  관심상품{' '}
                  <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold text-gray-400">?</span>
                </td>
                <td className="px-6 py-3 space-y-0.5">
                  <RadioRow dot="관심상품" options={[{ label: '전체' }, { label: '특정 상품' }]} />
                  <RadioRow dot="관심상품으로 등록한 시기" options={[{ label: '최근 3개월' }, { label: '최근 1개월' }]} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 대상자 수 바 */}
      <div className="border-t border-gray-200 bg-gray-50 px-8 py-4 flex items-center justify-end gap-4">
        <span className="text-sm text-gray-600">
          대상자 수 <span className="font-bold text-gray-900">0</span>명
        </span>
        <button className="rounded-md bg-[#3a3f45] px-5 py-2 text-sm font-bold text-white hover:bg-[#2d3138] transition-colors">
          대상자 조회
        </button>
      </div>

      {/* 취소 / 적용 */}
      <div className="border-t border-gray-200 bg-[#ebebeb] flex justify-center gap-3 py-4 shrink-0">
        <button className="rounded-lg bg-[#6b7280] px-12 py-2.5 text-sm font-bold text-white hover:bg-[#4b5563] transition-colors">
          취소
        </button>
        <button className="rounded-lg bg-[#3a3f45] px-12 py-2.5 text-sm font-bold text-white hover:bg-[#2d3138] transition-colors">
          적용
        </button>
      </div>
    </div>
  );
}
