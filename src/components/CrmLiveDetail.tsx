'use client';

import { useState } from 'react';
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
  { type: '브랜드메시지', purchase: '0', sent: '0', clicks: '0', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '0c', sentBlue: false, clicksBlue: false },
  { type: 'LMS',    purchase: '0', sent: '0', clicks: '1', clickRate: '0%', buyCount: '0', convRate: '0%', roas: '0%', cost: '12c', sentBlue: true,  clicksBlue: true  },
];

const CAMPAIGN_LIST = [
  { no: 17, name: 'LIVE 시작 알림 보내기_20260526_1', startDate: '2026-06-18 18:30', startHighlight: true,  createdAt: '2026-05-26 15:25:23', hasStats: true,  hasSend: true,  },
  { no: 16, name: 'LIVE 시작 알림 보내기_20260511_1', startDate: '2026-05-11 23:00', startHighlight: false, createdAt: '2026-05-11 22:01:12', hasStats: false, hasSend: false, },
  { no: 15, name: 'LIVE 시작 알림 보내기_20260310_1', startDate: '2026-03-10 16:00', startHighlight: false, createdAt: '2026-03-10 14:50:32', hasStats: false, hasSend: false, },
  { no: 14, name: 'LIVE 시작 알림 보내기_20251211_1', startDate: '2025-12-20 00:00', startHighlight: false, createdAt: '2025-12-11 10:28:39', hasStats: true,  hasSend: true,  },
];

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">
    {children}
  </span>
);

const STAT_TABS = ['APP푸시', '브랜드메시지(친구톡)', 'LMS'] as const;

const TEST_CAMPAIGN_TYPES = ['APP푸시', '브랜드메시지(친구톡)', 'LMS'] as const;

function TestPublishPopup({ onClose }: { onClose: () => void }) {
  const [checkedTypes, setCheckedTypes] = useState<string[]>(['APP푸시', '브랜드메시지(친구톡)', 'LMS']);
  const [phone, setPhone] = useState('');

  const toggle = (type: string) =>
    setCheckedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col bg-white rounded-lg shadow-2xl w-[480px] overflow-hidden">
        {/* 헤더 */}
        <div className="flex items-center gap-3 bg-[#2d3138] px-5 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-white/20">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5}>
              <rect x="1" y="1" width="14" height="14" rx="1" />
              <line x1="4" y1="11" x2="4" y2="8" />
              <line x1="7" y1="11" x2="7" y2="6" />
              <line x1="10" y1="11" x2="10" y2="4" />
              <line x1="13" y1="11" x2="13" y2="7" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white">테스트 생성</h2>
        </div>

        {/* 본문 */}
        <div className="px-6 py-5 space-y-4">
          <p className="text-sm text-gray-700">
            <span className="mr-1 text-gray-500">·</span>
            테스트 발행은 통계에 포함되지 않습니다.
          </p>

          <div className="border border-gray-200 rounded">
            {/* 캠페인 유형 */}
            <div className="flex border-b border-gray-200">
              <div className="w-28 shrink-0 flex items-center bg-gray-50 border-r border-gray-200 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">캠페인 유형</span>
              </div>
              <div className="flex-1 flex items-center gap-5 px-4 py-3 flex-wrap">
                {TEST_CAMPAIGN_TYPES.map((type) => (
                  <label key={type} className="flex items-center gap-1.5 cursor-pointer select-none">
                    <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${checkedTypes.includes(type) ? 'border-[#4DB87A] bg-[#4DB87A]' : 'border-gray-300 bg-white'}`}>
                      {checkedTypes.includes(type) && (
                        <svg viewBox="0 0 10 10" fill="none" className="h-2.5 w-2.5" stroke="white" strokeWidth={2}>
                          <polyline points="1.5,5 4,7.5 8.5,2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </span>
                    <input type="checkbox" className="sr-only" checked={checkedTypes.includes(type)} onChange={() => toggle(type)} />
                    <span className="text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* 휴대폰번호 */}
            <div className="flex">
              <div className="w-28 shrink-0 flex items-center bg-gray-50 border-r border-gray-200 px-4 py-3">
                <span className="text-sm font-medium text-gray-700">휴대폰번호</span>
              </div>
              <div className="flex-1 px-4 py-3">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="휴대폰번호 입력"
                  className="w-full rounded border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-[#4DB87A] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 푸터 */}
        <div className="border-t border-gray-200 bg-gray-50 flex justify-center gap-3 py-4">
          <button
            onClick={onClose}
            className="rounded-md bg-[#6b7280] px-10 py-2 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors"
          >
            취소
          </button>
          <button
            onClick={onClose}
            className="rounded-md bg-[#3a3f45] px-10 py-2 text-sm font-semibold text-white hover:bg-[#2d3138] transition-colors"
          >
            발행
          </button>
        </div>
      </div>
    </div>
  );
}

const TABLE_HEADERS = ['발송일', '구매 금액', '발송 수', '클릭 수', '클릭률', '구매건수', '구매전환율', 'ROAS', '지출 캐시'];

function StatsPopup({ campaignName, onClose }: { campaignName: string; onClose: () => void }) {
  const [activeTab, setActiveTab] = useState<string>('APP푸시');
  const [startDate, setStartDate] = useState('2026-06-03');
  const [endDate, setEndDate] = useState('2026-06-03');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="flex flex-col bg-white rounded-lg shadow-2xl w-[900px] max-h-[90vh] overflow-hidden">

        {/* 헤더 */}
        <div className="flex items-center gap-3 bg-[#2d3138] px-6 py-4">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-white/20">
            <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth={1.5}>
              <rect x="1" y="1" width="14" height="14" rx="1" />
              <line x1="4" y1="11" x2="4" y2="8" />
              <line x1="7" y1="11" x2="7" y2="6" />
              <line x1="10" y1="11" x2="10" y2="4" />
              <line x1="13" y1="11" x2="13" y2="7" />
            </svg>
          </div>
          <h2 className="text-base font-bold text-white">캠페인 통계</h2>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">

          {/* 기간 필터 */}
          <div className="rounded-lg border border-gray-200 bg-gray-50 px-5 py-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-sm font-semibold text-gray-700">기간</span>
              <input
                type="text"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 w-32 focus:outline-none focus:border-gray-400"
              />
              <span className="text-gray-500 text-sm">~</span>
              <input
                type="text"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="rounded border border-gray-300 px-3 py-1.5 text-sm text-gray-700 w-32 focus:outline-none focus:border-gray-400"
              />
              {['어제', '이전 7일', '이전 15일', '이전 30일', '전체'].map((label) => (
                <button key={label} className="rounded border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 transition-colors whitespace-nowrap">
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* 초기화 / 검색 버튼 */}
          <div className="flex justify-center gap-3">
            <button className="rounded-md bg-[#6b7280] px-8 py-2 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors">
              초기화
            </button>
            <button className="rounded-md bg-[#3a3f45] px-8 py-2 text-sm font-semibold text-white hover:bg-[#2d3138] transition-colors">
              검색
            </button>
          </div>

          {/* 탭 */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {STAT_TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab
                      ? 'border-[#3a3f45] text-[#3a3f45]'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 캠페인명 / 지출 캐시 배지 */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">캠페인명</span>
              <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">{campaignName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">지출 캐시</span>
              <span className="inline-flex items-center rounded-full bg-[#111827] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">0c</span>
            </div>
          </div>

          {/* 통계 지표 그리드 */}
          <div className="rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid grid-cols-4 divide-x divide-gray-200 border-b border-gray-200">
              {[
                { label: '구매 금액', value: '–', help: true },
                { label: '클릭 수',   value: '–', help: true },
                { label: '구매건수',  value: '–', help: false },
                { label: 'ROAS',      value: '–', help: true },
              ].map((item) => (
                <div key={item.label} className="px-5 py-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    {item.label}
                    {item.help && <HelpIcon />}
                  </p>
                  <p className="text-xl font-bold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 divide-x divide-gray-200">
              {[
                { label: '발송 수',    value: '–', help: false },
                { label: '클릭률',     value: '–', help: true },
                { label: '구매전환율', value: '–', help: true },
              ].map((item) => (
                <div key={item.label} className="px-5 py-4 text-center">
                  <p className="text-xs text-gray-500 mb-2">
                    {item.label}
                    {item.help && <HelpIcon />}
                  </p>
                  <p className="text-xl font-bold text-gray-800">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 캠페인 일자별 내역 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-gray-800">
                캠페인 일자별 내역{' '}
                <span className="text-xs font-normal text-gray-500">전체 0일 (페이지 1/0)</span>
              </h3>
              <button className="inline-flex items-center gap-1.5 rounded-md bg-[#1e6b3c] px-4 py-2 text-xs font-bold text-white hover:bg-[#165530] transition-colors whitespace-nowrap">
                일자별 내역
                <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
                  <path d="M8 12l-5-5h3V2h4v5h3L8 12z" />
                  <rect x="2" y="13" width="12" height="1.5" rx="0.75" />
                </svg>
              </button>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    {TABLE_HEADERS.map((h) => (
                      <th key={h} className="px-3 py-2.5 text-center text-xs font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={TABLE_HEADERS.length} className="py-10 text-center text-sm text-gray-400">
                      데이터가 없습니다.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* 닫기 버튼 */}
        <div className="border-t border-gray-200 py-4 flex justify-center bg-white">
          <button
            onClick={onClose}
            className="rounded-md bg-[#6b7280] px-12 py-2 text-sm font-semibold text-white hover:bg-[#4b5563] transition-colors"
          >
            닫기
          </button>
        </div>

      </div>
    </div>
  );
}

export default function CrmLiveDetail() {
  const [statsPopup, setStatsPopup] = useState<{ open: boolean; campaignName: string }>({ open: false, campaignName: '' });
  const [showTestPopup, setShowTestPopup] = useState(false);

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
              <span className="mr-1 text-gray-500">·</span>
              <span className="cursor-pointer font-medium text-[#4DB87A] hover:underline">원클릭 수동 캠페인이란?</span>
              {' '}직접 선택한 고객에게 특정 시점에 개별적으로 메시지를 노출하거나 발송합니다.
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
              <Badge>LIVE 시작 알림 보내기</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인 목적</Badge>
              <Badge>구매</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>캠페인 유형</Badge>
              <Badge>APP푸시, 브랜드메시지(친구톡), LMS</Badge>
            </div>
            <div className="flex items-center gap-1">
              <Badge>대상자</Badge>
              <span className="inline-flex items-center rounded-full bg-[#1e6b3c] px-3 py-1.5 text-xs font-bold text-white whitespace-nowrap">
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
            <div className="w-44 shrink-0 rounded-l-xl bg-[#1e6b3c] px-5 py-6 flex flex-col justify-center gap-5">
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
              <Link href="/crm/live/create" className="rounded-lg bg-[#1e6b3c] px-4 py-2 text-sm font-bold text-white hover:bg-[#165530] transition-colors">
                캠페인 생성 +
              </Link>
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
                        <button
                          onClick={() => setStatsPopup({ open: true, campaignName: row.name })}
                          className="rounded-md bg-[#3a3f45] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap"
                        >
                          통계&gt;
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.hasSend && (
                        <button
                          onClick={() => setShowTestPopup(true)}
                          className="rounded-md bg-[#3a3f45] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap"
                        >
                          테스트 발행&gt;
                        </button>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {row.hasSend && (
                        <button className="rounded-md bg-[#3a3f45] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#2d3138] transition-colors whitespace-nowrap">
                          발송 내역&gt;
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

      {/* 테스트 발행 팝업 */}
      {showTestPopup && <TestPublishPopup onClose={() => setShowTestPopup(false)} />}

      {/* 캠페인 통계 팝업 */}
      {statsPopup.open && (
        <StatsPopup
          campaignName={statsPopup.campaignName}
          onClose={() => setStatsPopup({ open: false, campaignName: '' })}
        />
      )}
    </div>
  );
}
