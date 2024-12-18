export const DW_ACCESS = {
  DW_ACCESS_public: 0x01,
  DW_ACCESS_protected: 0x02,
  DW_ACCESS_private: 0x03, 
}

export type DW_ACCESS_KEY = keyof typeof DW_ACCESS;