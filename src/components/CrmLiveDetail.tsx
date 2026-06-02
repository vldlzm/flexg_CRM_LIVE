'use client';

import Link from 'next/link';

const HelpIcon = () => (
  <span className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border border-gray-400 text-[9px] font-bold text-gray-400 ml-0.5 align-middle">?</span>
);

const RoasIconWhite = () => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,11 5,7 8,9.5 15,3" />
      <polyline points="12,3 15,3 15,6" />
    </svg>
  </div>
);

const PurchaseIconWhite = () => (
  <div className="flex h-6 w-6 items-center justify-center rounded-md bg-white/20">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-white" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2h6l1.5 5H3.5L5 2z" />
      <path d="M3.5 7l1 5h7l1-5" />
      <circle cx="6" cy="14" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  </div>
);

const STATS_DATA = [
  { type: 'APP푸시', purchase: '0', sent: '0', clicks: '0', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '무료', sentBlue: false, clicksBlue: false },
  { type: '알림톡',  purchase: '0', sent: '0', clicks: '0', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '0c',  sentBlue: true,  clicksBlue: false },
  { type: '브랜드메시지', purchase: '0', sent: '0', clicks: '0', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '0c', sentBlue: false, clicksBlue: false },
  { type: 'LMS',    purchase: '0', sent: '0', clicks: '1', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '12c', sentBlue: true,  clicksBlue: true  },
];

const CAMPAIGN_LIST = [
  { no: 17, name: '맞춤 시나리오로 보내기_20260526_1', startDate: '2026-06-18 18:30', startHighlight: true,  createdAt: '2026-05-26 15:25:23', hasStats: true,  hasSend: true,  hasDownload: true  },
  { no: 16, name: '맞춤 시나리오로 보내기_20260511_1', startDate: '2026-05-11 23:00', startHighlight: false, createdAt: '2026-05-11 22:01:12', hasStats: false, hasSend: false, hasDownload: false },
  { no: 15, name: '맞춤 시나리오로 보내기_20260310_1', startDate: '2026-03-10 16:00', startHighlight: false, createdAt: '2026-03-10 14:50:32', hasStats: false, hasSend: false, hasDownload: false },
  { no: 14, name: '맞춤 시나리오로 보내기_20251211_1', startDate: '2025-12-20 00:00', startHighlight: false, createdAt: '2025-12-11 10:28:39', hasStats: true,  hasSend: true,  hasDownload: false },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-[#1f2937] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">
    {children}
  </span>
);

export default function CrmLiveDetail() {
  return (
    <div className="min-h-screen bg-white">
      {/* ← 목록 */}
      <div className="border-b border-gray-200 px-8 py-3">
        <Link href="/crm/live" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors">
          <svg viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M10.707 3.293a1 1 0 010 1.414L7.414 8l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          목록
        </Link>
      </div>

      <div className="px-8 py-6 space-y-8">

        {/* ── 캠페인 ── */}
        <section>
          <h2 className="mb-3 text-xl font-bold text-gray-900">캠페인</h2>
          <div className="mb-5 space-y-1.5">
            <p className="text-sm text-gray-700">
              <span className="cursor-pointer font-medium text-[#4DB87A] hover:underline">원클릭 수동 캠페인이란?</span>
              {' '}직접 선택한 고객에게 특정 시점에 개별적으로 메시지를 노출하거나 발송합니다.
            </p>
            <p className="text-sm text-gray-700">
              <span className="cursor-pointer font-medium text-[#4DB87A] hover:underline">맞춤 시나리오란?</span>
              {' '}구매 가능성이 높은 고객을 직접 선택해 맞춤형으로 할인코드와 상품 추천을 진행할 수 있는 캠페인입니다.
            </p>
          </div>

          {/* 캠페인 정보 배지 행 */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Badge>진행여부</Badge>
              <Badge>진행중</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인 구분</Badge>
              <Badge>원클릭 수동 캠페인</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인명</Badge>
              <Badge>맞춤 시나리오로 보내기</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인 목적</Badge>
              <Badge>구매</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인 유형</Badge>
              <Badge>APP푸시, 알림톡, 브랜드메시지, LMS</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>대상자</Badge>
              <span className="inline-flex items-center rounded-full bg-[#4DB87A] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">
                직접 설정
              </span>
            </div>
          </div>
        </section>

        {/* ── 캠페인 전체 통계 ── */}
        <section>
          <h2 className="mb-1 text-xl font-bold text-gray-900">캠페인 전체 통계</h2>
          <p className="mb-4 text-sm text-gray-500">진행된 모든 캠페인의 성과를 종합적으로 측정하고 분석합니다.</p>

          <div className="flex">
            {/* 좌측 그린 카드 */}
            <div className="w-44 shrink-0 rounded-l-xl bg-[#2d7a4f] px-5 py-6 flex flex-col justify-center gap-5">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <RoasIconWhite />
                  <span className="text-xs font-medium text-white/80">ROAS</span>
                </div>
                <p className="text-2xl font-black text-white">0%</p>
              </div>
              <div className="border-t border-white/20" />
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <PurchaseIconWhite />
                  <span className="text-xs font-medium text-white/80">구매 금액</span>
                </div>
                <p className="text-2xl font-black text-white">0원</p>
              </div>
            </div>

            {/* 우측 통계 테이블 */}
            <div className="flex-1 overflow-x-auto rounded-r-xl border-y border-r border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">캠페인 유형</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">구매 금액<HelpIcon /></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">발송 수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">클릭 수<HelpIcon /></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">클릭률<HelpIcon /></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">구매건수</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">구매전환율<HelpIcon /></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">ROAS<HelpIcon /></th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">지출 개시</th>
                  </tr>
                </thead>
                <tbody>
                  {STATS_DATA.map((row) => (
                    <tr key={row.type} className="border-b border-gray-100 last:border-0">
                      <td className="px-4 py-3 text-sm text-gray-700">{row.type}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.purchase}</td>
                      <td className={`px-4 py-3 text-center text-sm ${row.sentBlue ? 'text-blue-500' : 'text-gray-700'}`}>{row.sent}</td>
                      <td className={`px-4 py-3 text-center text-sm ${row.clicksBlue ? 'text-blue-500' : 'text-gray-700'}`}>{row.clicks}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.clickRate}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.buyCount}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.convRate}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.roas}</td>
                      <td className="px-4 py-3 text-center text-sm text-gray-700">{row.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 캠페인 목록 ── */}
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              캠페인 목록{' '}
              <span className="text-sm font-normal text-gray-500">전체 17건 (페이지 1/2)</span>
            </h2>
            <div className="flex items-center gap-2">
              <button className="rounded-lg bg-[#2d7a4f] px-4 py-2 text-sm font-bold text-white hover:bg-[#236040] transition-colors">
                캠페인 생성 +
              </button>
              <select className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none">
                <option>10개씩 보기</option>
                <option>20개씩 보기</option>
                <option>50개씩 보기</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 w-12">No</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">캠페인명</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">캠페인 기간</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">생성일</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">통계</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">테스트 발행</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">발송 내역</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">다운로드</th>
                  <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">진행 여부</th>
                </tr>
              </thead>
              <tbody>
                {CAMPAIGN_LIST.map((row) => (
                  <tr key={row.no} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50">
                    <td className="px-4 py-3 text-center text-sm text-gray-600">{row.no}</td>
                    <td className="px-4 py-3">
                      <span className="cursor-pointer text-sm text-[#4DB87A] hover:underline">{row.name}</span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm whitespace-nowrap">
                      <span className="text-gray-500">시작 : </span>
                      <span className={row.startHighlight ? 'font-medium text-[#4DB87A]' : 'text-gray-700'}>
                        {row.startDate}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center text-sm text-gray-600 whitespace-nowrap">{row.createdAt}</td>
                    <td className="px-4 py-3 text-center">
                      {row.hasStats && (
                        <button className="rounded-md bg-[#3d4043] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap">
                          통계&gt;
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.hasSend && (
                        <button className="rounded-md bg-[#3d4043] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap">
                          테스트 발행&gt;
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.hasSend && (
                        <button className="rounded-md bg-[#3d4043] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap">
                          발송 내역&gt;
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.hasDownload && (
                        <button className="rounded-md bg-[#2d7a4f] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#236040] transition-colors whitespace-nowrap">
                          대상자 ↓
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <span className="rounded-full border border-[#4DB87A] px-3 py-1 text-xs font-semibold text-[#4DB87A] whitespace-nowrap">
                        진행 종료
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
