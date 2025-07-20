export interface NavbarProps {
  sidebarWidth: number
  onMobileMenuClick: () => void
}

export interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onToggle: () => void;
  onClose: () => void;
  selectedItem: string;
  onItemSelect: (item: string) => void;
}

