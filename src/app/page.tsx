'use client';

import { useState, useEffect } from 'react';

interface Screen {
  id: string;
  name: string;
  href: string;
  description: string;
  notes: string[];
}

interface ScreenGroup {
  category: string;
  screens: Screen[];
}

const SCREEN_GROUPS: ScreenGroup[] = [
  {
    category: 'CRM 라이브',
    screens: [
      {
        id: 'crm-live-list',
        name: '목록',
        href: '/crm/live',
        description: '',
        notes: [],
      },
      {
        id: 'crm-live-detail',
        name: '상세',
        href: '/crm/live/detail',
        description: '',
        notes: [],
      },
      {
        id: 'crm-live-create',
        name: '생성',
        href: '/crm/live/create',
        description: '',
        notes: [],
      },
    ],
  },
];

const ALL_SCREENS = SCREEN_GROUPS.flatMap((g) => g.screens);

export default function ScreenIndex() {
  const [selectedId, setSelectedId] = useState<string>(ALL_SCREENS[0].id);
  const [inIframe, setInIframe] = useState(false);

  useEffect(() => {
    if (window.self !== window.top) setInIframe(true);
  }, []);

  if (inIframe) return null;

  const selected = ALL_SCREENS.find((s) => s.id === selectedId)!;
  const selectedCategory = SCREEN_GROUPS.find((g) =>
    g.screens.some((s) => s.id === selectedId)
  )?.category;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8f8f8]">

      {/* ── 좌측: 화면 목록 ── */}
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white flex flex-col">
        <div className="border-b border-gray-100 px-4 py-4">
          <h1 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 목록</h1>
          <p className="mt-0.5 text-[10px] text-gray-400">화면을 선택하면 우측에서 확인합니다.</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-2">
          {SCREEN_GROUPS.map((group) => (
            <div key={group.category} className="mb-2">
              <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
                {group.category}
              </p>
              <ul>
                {group.screens.map((screen) => {
                  const isActive = screen.id === selectedId;
                  return (
                    <li key={screen.id}>
                      <button
                        onClick={() => setSelectedId(screen.id)}
                        className={`relative w-full px-4 py-2.5 text-left text-sm transition-all ${
                          isActive
                            ? 'bg-[#f0faf5] font-semibold text-[#2a7a4f]'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-[#4DB87A]" />
                        )}
                        <span className="whitespace-pre-line leading-snug text-[13px]">{screen.name}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── 중앙: 실제 화면 (iframe) ── */}
      <div className="flex flex-1 flex-col overflow-hidden border-r border-gray-200">
        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#4DB87A]">
              {selectedCategory}
            </span>
            <span className="text-gray-300">·</span>
            <h2 className="text-sm font-bold text-gray-900 whitespace-pre-line leading-snug">
              {selected.name}
            </h2>
          </div>
          <a
            href={selected.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg bg-[#4DB87A] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#3da869] active:scale-95 transition-all"
          >
            <svg viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3">
              <path d="M8.636 3.5a.5.5 0 00-.5-.5H1.5A1.5 1.5 0 000 4.5v10A1.5 1.5 0 001.5 16h10a1.5 1.5 0 001.5-1.5V7.864a.5.5 0 00-1 0V14.5a.5.5 0 01-.5.5h-10a.5.5 0 01-.5-.5v-10a.5.5 0 01.5-.5h6.636a.5.5 0 00.5-.5z" />
              <path d="M16 .5a.5.5 0 00-.5-.5h-5a.5.5 0 000 1h3.793L6.146 9.146a.5.5 0 10.708.708L15 1.707V5.5a.5.5 0 001 0v-5z" />
            </svg>
            새 탭에서 열기
          </a>
        </div>
        <iframe
          key={selected.href}
          src={`${selected.href}?embed=1`}
          className="flex-1 w-full border-none"
          title={selected.name}
        />
      </div>

      {/* ── 우측: 화면 설명 ── */}
      <aside className="w-72 shrink-0 bg-white flex flex-col overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-800">화면 설명</h3>
          <p className="mt-0.5 text-[10px] text-gray-400">선택한 화면의 기능 및 정책 안내</p>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {selected.description && (
            <div>
              <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">화면 개요</p>
              <p className="text-sm text-gray-600 leading-relaxed">{selected.description}</p>
            </div>
          )}
          {selected.notes.length > 0 && (
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">주요 기능 및 정책</p>
              <ul className="divide-y divide-gray-100">
                {selected.notes.map((note, i) => (
                  <li key={i} className="py-3 text-sm text-gray-600 leading-relaxed">
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

    </div>
  );
}
