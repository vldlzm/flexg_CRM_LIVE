'use client';

import { useState } from 'react';

interface Campaign {
  id: string;
  purpose: string;
  isNew: boolean;
  status: '진행중' | '일시정지' | '완료';
  title: string;
  roas: string;
  purchaseAmount: string;
  onsite: string;
  onsiteSupported: boolean;
  offsite: string;
}

const CAMPAIGNS: Campaign[] = [
  {
    id: 'c1',
    purpose: '구매',
    isNew: true,
    status: '진행중',
    title: '맞춤 시나리오로 보내기',
    roas: '0%',
    purchaseAmount: '0원',
    onsite: '미지원',
    onsiteSupported: false,
    offsite: '12c',
  },
];

const STATUS_STYLE: Record<Campaign['status'], string> = {
  진행중: 'bg-[#2d3138] text-white',
  일시정지: 'bg-amber-100 text-amber-700',
  완료: 'bg-gray-100 text-gray-500',
};

const RoasIcon = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-gray-500" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1,11 5,7 8,9.5 15,3" />
      <polyline points="12,3 15,3 15,6" />
    </svg>
  </div>
);

const PurchaseIcon = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-gray-500" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2h6l1.5 5H3.5L5 2z" />
      <path d="M3.5 7l1 5h7l1-5" />
      <circle cx="6" cy="14" r="0.8" fill="currentColor" stroke="none" />
      <circle cx="10" cy="14" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  </div>
);

const OnsiteIcon = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-gray-500" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="2" width="14" height="9" rx="1.5" />
      <path d="M5.5 13.5h5" />
      <path d="M8 11v2.5" />
    </svg>
  </div>
);

const OffsiteIcon = () => (
  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 text-gray-500" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3.5A1.5 1.5 0 013.5 2h9A1.5 1.5 0 0114 3.5v6A1.5 1.5 0 0112.5 11H9l-3 2.5V11H3.5A1.5 1.5 0 012 9.5v-6z" />
    </svg>
  </div>
);

function CampaignCard({ campaign }: { campaign: Campaign }) {
  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {/* 헤더 */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-400">
          목적 <span className="font-medium text-gray-700">{campaign.purpose}</span>
        </span>
        <div className="flex items-center gap-1.5">
          {campaign.isNew && (
            <span className="rounded-full bg-[#d4f5e5] px-2 py-0.5 text-[11px] font-bold text-[#2a7a4f]">
              NEW
            </span>
          )}
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${STATUS_STYLE[campaign.status]}`}>
            {campaign.status}
          </span>
        </div>
      </div>

      {/* 제목 */}
      <h3 className="text-center text-sm font-bold leading-snug text-gray-900">
        {campaign.title}
      </h3>

      {/* 성과 지표 1: ROAS + 구매 금액 */}
      <div className="rounded-xl bg-gray-50 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RoasIcon />
            <span className="text-xs text-gray-600">ROAS</span>
          </div>
          <span className="text-xs font-semibold text-[#4DB87A]">{campaign.roas}</span>
        </div>
        <div className="my-2 border-t border-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PurchaseIcon />
            <span className="text-xs text-gray-600">구매 금액</span>
          </div>
          <span className="text-xs font-semibold text-gray-700">{campaign.purchaseAmount}</span>
        </div>
      </div>

      {/* 성과 지표 2: 온사이트 + 오프사이트 */}
      <div className="rounded-xl bg-gray-50 px-3 py-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <OnsiteIcon />
            <span className="text-xs text-gray-600">온사이트</span>
          </div>
          <span className={`text-xs font-semibold ${campaign.onsiteSupported ? 'text-gray-700' : 'text-gray-400'}`}>
            {campaign.onsite}
          </span>
        </div>
        <div className="my-2 border-t border-gray-200" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <OffsiteIcon />
            <span className="text-xs text-gray-600">오프사이트</span>
          </div>
          <span className="text-xs font-semibold text-[#4DB87A]">{campaign.offsite}</span>
        </div>
      </div>

      {/* 캠페인 상세 버튼 */}
      <button className="w-full rounded-xl bg-[#3d4043] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d3138] active:scale-[0.98]">
        캠페인 상세
      </button>
    </div>
  );
}

export default function CrmLiveList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('전체');

  const filtered = CAMPAIGNS.filter((c) => {
    const matchStatus = statusFilter === '전체' || c.status === statusFilter;
    const matchSearch = c.title.includes(search);
    return matchStatus && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#f8f8f8]">
      {/* 상단 헤더 */}
      <div className="sticky top-0 z-20 border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-[1440px] items-center px-6 py-4">
          <h1 className="text-lg font-bold text-gray-900">CRM 라이브</h1>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] space-y-5 p-6">
        {/* 필터 */}
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-700 focus:border-[#4DB87A] focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
            >
              <option value="전체">상태 전체</option>
              <option value="진행중">진행중</option>
              <option value="일시정지">일시정지</option>
              <option value="완료">완료</option>
            </select>
            <div className="relative ml-auto min-w-[260px]">
              <svg viewBox="0 0 20 20" fill="currentColor" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
              <input
                type="text"
                placeholder="캠페인명 검색"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:border-[#4DB87A] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#4DB87A]/20 transition-all"
              />
            </div>
          </div>
        </section>

        {/* 캠페인 카드 그리드 */}
        <section>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-20 text-center shadow-sm ring-1 ring-gray-100">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-7 w-7 text-gray-400" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-gray-700">검색 결과가 없습니다</p>
              <p className="mt-1.5 text-xs text-gray-400">다른 검색어나 필터를 적용해 보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((campaign) => (
                <CampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
