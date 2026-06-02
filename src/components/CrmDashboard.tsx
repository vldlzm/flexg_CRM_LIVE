'use client';

import { useState } from 'react';

const CBadge = () => (
  <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#6366f1] text-[8px] font-bold text-white">C</span>
);

const DAILY_DATES = ['22', '23', '24', '25', '26', '27', '28'];
const MONTHLY_LABELS = ['5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월', '25년', '26년', '3월', '4월'];

function LineChart({ xLabels, legend }: { xLabels: string[]; legend: { color: string; label: string }[] }) {
  const W = 540; const H = 130; const padL = 40; const padR = 50; const padT = 10; const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;
  const yLevels = [0, 0.2, 0.4, 0.6, 0.8, 1];
  const n = xLabels.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
      {/* 배경 */}
      <rect width={W} height={H} fill="#fff5f5" rx="4" />
      {/* 수평 그리드 */}
      {yLevels.map((v) => {
        const y = padT + plotH * (1 - v);
        return (
          <g key={v}>
            <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#fca5a5" strokeWidth={0.5} strokeDasharray="3,3" />
            <text x={padL - 4} y={y + 4} textAnchor="end" fontSize={8} fill="#9ca3af">{v}</text>
            <text x={W - padR + 4} y={y + 4} fontSize={8} fill="#9ca3af">{(v * 100).toFixed(0)}%</text>
          </g>
        );
      })}
      {/* 데이터 라인들 (모두 0 = 맨 아래) */}
      {legend.map((item, li) => {
        const y0 = padT + plotH;
        const pts = xLabels.map((_, i) => {
          const x = padL + (i / (n - 1)) * plotW;
          return `${x},${y0}`;
        }).join(' ');
        return (
          <g key={li}>
            <polyline points={pts} fill="none" stroke={item.color} strokeWidth={1.5} />
            {xLabels.map((_, i) => {
              const x = padL + (i / (n - 1)) * plotW;
              return <circle key={i} cx={x} cy={y0} r={3} fill={item.color} />;
            })}
          </g>
        );
      })}
      {/* X 라벨 */}
      {xLabels.map((label, i) => {
        const x = padL + (i / (n - 1)) * plotW;
        return <text key={i} x={x} y={H - 4} textAnchor="middle" fontSize={8} fill="#6b7280">{label}</text>;
      })}
    </svg>
  );
}

const TABLE_HEADERS = ['캠페인 목적', '캠페인명', '캠페인 기간', '핵심 지표', '결과', '비용', '발생매출', '회원가입수', 'APP설치수', '재방문수', '상태'];

export default function CrmDashboard() {
  const [activeTab, setActiveTab] = useState('구매');
  const [tableFilter, setTableFilter] = useState('전체');

  const metricCards = [
    {
      badge: '구매', badgeColor: '#4DB87A',
      title: 'ROAS',
      value: '0%', valueColor: '#ef4444',
      metrics: [
        { icon: <span className="h-3 w-3 border border-gray-400 rounded-sm inline-block" />, label: '구매금액', value: '0원' },
        { icon: <CBadge />, label: '캐시', value: '0c' },
      ],
    },
    {
      badge: '회원가입', badgeColor: '#14b8a6',
      title: '회원 가입 수',
      value: '0건', valueColor: '#111827',
      metrics: [
        { icon: <span className="text-gray-400 text-[10px]">A</span>, label: '회원가입 전환율', value: '0%' },
        { icon: <span className="h-3 w-3 border border-gray-400 rounded-sm inline-block" />, label: '노출 수', value: '0건' },
      ],
    },
    {
      badge: '구매', badgeColor: '#4DB87A',
      title: 'APP설치당 비용',
      value: '0원', valueColor: '#111827',
      metrics: [
        { icon: <span className="text-gray-400 text-[10px]">📱</span>, label: 'APP설치 수', value: '0건' },
        { icon: <span className="h-3 w-3 border border-gray-400 rounded-sm inline-block" />, label: 'APP설치 전환율', value: '0%' },
        { icon: <CBadge />, label: '캐시', value: '0c' },
      ],
    },
    {
      badge: '구매', badgeColor: '#4DB87A',
      title: '재방문당 비용',
      value: '0원', valueColor: '#111827',
      metrics: [
        { icon: <span className="text-[10px] text-gray-400">⊙</span>, label: '재방문 수', value: '0건' },
        { icon: <span className="text-[10px] text-gray-400">⊙</span>, label: '재방문율', value: '0%' },
        { icon: <CBadge />, label: '캐시', value: '0c' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* 핵심지표 검색 */}
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="mb-4 text-sm font-bold text-gray-800">핵심지표 검색</h2>
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs text-gray-600 shrink-0">기간 검색</span>
          <input type="date" defaultValue="2026-05-22" className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#4DB87A] focus:outline-none" />
          <span className="text-xs text-gray-500">→</span>
          <input type="date" defaultValue="2026-05-28" className="rounded border border-gray-300 px-2 py-1 text-xs focus:border-[#4DB87A] focus:outline-none" />
          {['어제', '지난 7일', '지난 15일', '지난 30일'].map((btn) => (
            <button key={btn} className="rounded border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 transition-colors">{btn}</button>
          ))}
        </div>
        <div className="flex justify-center gap-2">
          <button className="rounded border border-gray-300 px-6 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors">초기화</button>
          <button className="rounded bg-[#111827] px-6 py-1.5 text-xs font-bold text-white hover:bg-black transition-colors">검색</button>
        </div>
      </div>

      <div className="px-6 py-5 space-y-5">
        {/* CRM 캠페인 지표 */}
        <div>
          <h2 className="mb-3 text-sm font-bold text-gray-800">CRM 캠페인 지표</h2>
          <div className="flex gap-3">
            {/* 캐시 카드 */}
            <div className="w-44 shrink-0 rounded-lg bg-[#1e6b3c] p-4 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CBadge /><span className="text-xs text-white/80">잔여 캐시</span>
                </div>
                <span className="text-sm font-bold text-white">30,000원</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <CBadge /><span className="text-xs text-white/80">지출 캐시</span>
                </div>
                <span className="text-sm font-bold text-white">0 원</span>
              </div>
              <div className="border-t border-white/20 pt-2">
                <p className="text-[10px] text-white/70 mb-1">ⓘ 부족한 캐시 바로 충전하세요!</p>
                <button className="rounded bg-[#f59e0b] px-3 py-1 text-[10px] font-bold text-white hover:bg-[#d97706] transition-colors">충전</button>
              </div>
            </div>
            {/* 지표 카드 4개 */}
            {metricCards.map((card, i) => (
              <div key={i} className="flex-1 rounded-lg border border-[#fca5a5] bg-[#fff5f5] p-3">
                <span className="inline-block rounded px-2 py-0.5 text-[10px] font-bold text-white mb-2" style={{ backgroundColor: card.badgeColor }}>{card.badge}</span>
                <p className="text-xs text-gray-500 mb-1">{card.title}</p>
                <p className="text-2xl font-black mb-3 leading-none" style={{ color: card.valueColor }}>{card.value}</p>
                <div className="space-y-1.5">
                  {card.metrics.map((m, mi) => (
                    <div key={mi} className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {m.icon}
                        <span className="text-[10px] text-gray-500">{m.label}</span>
                      </div>
                      <span className="text-[10px] font-semibold text-gray-700">{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 탭 */}
        <div className="flex border-b border-gray-200">
          {['구매', '회원가입', 'APP설치', '재방문자'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 text-sm font-semibold transition-colors ${activeTab === tab ? 'border-b-2 border-[#ef4444] text-[#ef4444]' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 차트 2개 */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-1 mb-3">
              <h3 className="text-xs font-semibold text-gray-700">{activeTab} 일별 지표</h3>
              <span className="text-[10px] text-gray-400">ⓘ 최근 30일간</span>
            </div>
            <LineChart xLabels={DAILY_DATES} legend={[{ color: '#2563eb', label: 'ROAS' }, { color: '#22c55e', label: '구매금액' }]} />
            <div className="mt-2 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-[#2563eb] inline-block" /><span className="text-[10px] text-gray-500">ROAS</span></div>
              <div className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-[#22c55e] inline-block" /><span className="text-[10px] text-gray-500">구매금액</span></div>
            </div>
          </div>
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-1 mb-3">
              <h3 className="text-xs font-semibold text-gray-700">{activeTab} 월별 지표</h3>
              <span className="text-[10px] text-gray-400">ⓘ 최근 1년간</span>
            </div>
            <LineChart xLabels={MONTHLY_LABELS} legend={[{ color: '#2563eb', label: '지출캐시' }, { color: '#22c55e', label: '구매금액' }]} />
            <div className="mt-2 flex items-center justify-center gap-4">
              <div className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-[#2563eb] inline-block" /><span className="text-[10px] text-gray-500">지출캐시</span></div>
              <div className="flex items-center gap-1"><span className="h-2 w-4 rounded-full bg-[#22c55e] inline-block" /><span className="text-[10px] text-gray-500">구매금액</span></div>
            </div>
          </div>
        </div>

        {/* 데이터 테이블 */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700">온사이트, 오프사이트 함께 데이터</h3>
            <div className="flex items-center gap-3 text-xs text-gray-600">
              {['전체', 'ON', 'OFF'].map((f) => (
                <label key={f} className="flex items-center gap-1 cursor-pointer">
                  <input type="radio" name="filter" value={f} checked={tableFilter === f} onChange={() => setTableFilter(f)} className="accent-[#4DB87A]" />
                  {f}
                </label>
              ))}
            </div>
          </div>
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {TABLE_HEADERS.map((h) => (
                    <th key={h} className="px-3 py-3 text-center font-semibold text-gray-600 whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={TABLE_HEADERS.length} className="py-10 text-center text-sm text-[#4DB87A]">
                    데이터가 없습니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
