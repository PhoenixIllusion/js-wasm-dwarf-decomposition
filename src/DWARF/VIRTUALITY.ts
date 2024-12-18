export const DW_VIRTUALITY = {
  DW_VIRTUALITY_none: 0x00,
  DW_VIRTUALITY_virtual: 0x01,
  DW_VIRTUALITY_pure_virtual: 0x02, 
  DW_VIRTUALITY_max: 0x02
}
export type DW_VIRTUALITY_KEY = keyof typeof DW_VIRTUALITY;