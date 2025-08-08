import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

export interface MenuItem {
  id: string;
  name: string;
  url: string;
  order: number;
  isActive: boolean;
  isVisible: boolean;
  parentId?: string;
  children?: MenuItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface MenuContextType {
  menuItems: MenuItem[];
  visibleMenuItems: MenuItem[];
  addMenuItem: (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMenuItem: (id: string, updates: Partial<MenuItem>) => void;
  deleteMenuItem: (id: string) => void;
  toggleMenuItemVisibility: (id: string) => void;
  toggleMenuItemActive: (id: string) => void;
  loading: boolean;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

// 로컬 스토리지 키
const MENU_STORAGE_KEY = 'cms-menu-items-v2';

// 초기 메뉴 데이터 - 서브메뉴 포함
const initialMenuItems: MenuItem[] = [
  {
    id: '1',
    name: '홈',
    url: '/',
    order: 1,
    isActive: true,
    isVisible: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: '소개',
    url: '/about',
    order: 2,
    isActive: true,
    isVisible: true,
    children: [
      {
        id: '2-1',
        name: '회사 소개',
        url: '/about',
        order: 1,
        isActive: true,
        isVisible: true,
        parentId: '2',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2-2',
        name: '팀 소개',
        url: '/about',
        order: 2,
        isActive: true,
        isVisible: true,
        parentId: '2',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '2-3',
        name: '연혁',
        url: '/about',
        order: 3,
        isActive: true,
        isVisible: true,
        parentId: '2',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: '블로그',
    url: '/blog',
    order: 3,
    isActive: true,
    isVisible: true,
    children: [
      {
        id: '3-1',
        name: '기술 블로그',
        url: '/blog',
        order: 1,
        isActive: true,
        isVisible: true,
        parentId: '3',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '3-2',
        name: '회사 소식',
        url: '/blog',
        order: 2,
        isActive: true,
        isVisible: true,
        parentId: '3',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: '3-3',
        name: '고객 사례',
        url: '/blog',
        order: 3,
        isActive: true,
        isVisible: true,
        parentId: '3',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      }
    ],
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '4',
    name: '연락처',
    url: '/contact',
    order: 4,
    isActive: true,
    isVisible: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

// 메뉴 아이템 데이터 검증 함수
const validateMenuItem = (item: any): item is MenuItem => {
  return (
    typeof item === 'object' &&
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.url === 'string' &&
    typeof item.order === 'number' &&
    typeof item.isActive === 'boolean' &&
    typeof item.isVisible === 'boolean' &&
    item.createdAt &&
    item.updatedAt
  );
};

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  // 보이는 메뉴 아이템만 필터링
  const visibleMenuItems = menuItems
    .filter(item => item.isVisible && item.isActive)
    .sort((a, b) => a.order - b.order);

  // 로컬 스토리지에서 메뉴 데이터 로드
  useEffect(() => {
    const loadMenuItems = () => {
      try {
        const savedMenuItems = localStorage.getItem(MENU_STORAGE_KEY);
        console.log('로컬 스토리지에서 메뉴 데이터 로드 시도:', savedMenuItems);
        
        if (savedMenuItems) {
          const parsed = JSON.parse(savedMenuItems);
          console.log('파싱된 메뉴 데이터:', parsed);
          
          // 배열인지 확인하고 각 아이템 검증
          if (Array.isArray(parsed) && parsed.length > 0) {
            const validItems = parsed.filter(validateMenuItem);
            console.log('검증된 메뉴 아이템:', validItems);
            
            if (validItems.length > 0) {
              // 날짜 객체 복원
              const itemsWithDates = validItems.map((item: any) => ({
                ...item,
                createdAt: new Date(item.createdAt),
                updatedAt: new Date(item.updatedAt)
              }));
              console.log('날짜 객체 복원된 메뉴 데이터:', itemsWithDates);
              setMenuItems(itemsWithDates);
            } else {
              console.log('유효한 메뉴 아이템이 없음, 초기 데이터 사용');
              setMenuItems(initialMenuItems);
            }
          } else {
            console.log('저장된 데이터가 유효한 배열이 아님, 초기 데이터 사용');
            setMenuItems(initialMenuItems);
          }
        } else {
          console.log('로컬 스토리지에 저장된 메뉴 데이터가 없음, 초기 데이터 사용');
          setMenuItems(initialMenuItems);
        }
      } catch (error) {
        console.error('메뉴 데이터 로드 실패:', error);
        console.log('에러 발생으로 초기 데이터 사용');
        setMenuItems(initialMenuItems);
      } finally {
        setLoading(false);
      }
    };

    loadMenuItems();
  }, []);

  // 메뉴 데이터가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    if (menuItems.length > 0 && !loading) {
      console.log('메뉴 데이터 변경됨, 로컬 스토리지에 저장:', menuItems);
      try {
        localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
        console.log('메뉴 데이터 저장 완료');
      } catch (error) {
        console.error('메뉴 데이터 저장 실패:', error);
      }
    }
  }, [menuItems, loading]);

  const addMenuItem = (item: Omit<MenuItem, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setMenuItems(prev => [...prev, newItem]);
  };

  const updateMenuItem = (id: string, updates: Partial<MenuItem>) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, ...updates, updatedAt: new Date() }
          : item
      )
    );
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const toggleMenuItemVisibility = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isVisible: !item.isVisible, updatedAt: new Date() }
          : item
      )
    );
  };

  const toggleMenuItemActive = (id: string) => {
    setMenuItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, isActive: !item.isActive, updatedAt: new Date() }
          : item
      )
    );
  };

  const value: MenuContextType = {
    menuItems,
    visibleMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleMenuItemVisibility,
    toggleMenuItemActive,
    loading
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (context === undefined) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
