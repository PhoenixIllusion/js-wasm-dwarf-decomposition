// https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/BinaryFormat/Dwarf.def
export const DW_AT = {
  DW_AT_sibling: 0x01,
  DW_AT_location: 0x02,
  DW_AT_name: 0x03,
  DW_AT_ordering: 0x09,
  DW_AT_byte_size: 0x0b,
  DW_AT_bit_offset: 0x0c,
  DW_AT_bit_size: 0x0d,
  DW_AT_stmt_list: 0x10,
  DW_AT_low_pc: 0x11,
  DW_AT_high_pc: 0x12,
  DW_AT_language: 0x13,
  DW_AT_discr: 0x15,
  DW_AT_discr_value: 0x16,
  DW_AT_visibility: 0x17,
  DW_AT_import: 0x18,
  DW_AT_string_length: 0x19,
  DW_AT_common_reference: 0x1a,
  DW_AT_comp_dir: 0x1b,
  DW_AT_const_value: 0x1c,
  DW_AT_containing_type: 0x1d,
  DW_AT_default_value: 0x1e,
  DW_AT_inline: 0x20,
  DW_AT_is_optional: 0x21,
  DW_AT_lower_bound: 0x22,
  DW_AT_producer: 0x25,
  DW_AT_prototyped: 0x27,
  DW_AT_return_addr: 0x2a,
  DW_AT_start_scope: 0x2c,
  DW_AT_bit_stride: 0x2e,
  DW_AT_upper_bound: 0x2f,
  DW_AT_abstract_origin: 0x31,
  DW_AT_accessibility: 0x32,
  DW_AT_address_class: 0x33,
  DW_AT_artificial: 0x34,
  DW_AT_base_types: 0x35,
  DW_AT_calling_convention: 0x36,
  DW_AT_count: 0x37,
  DW_AT_data_member_location: 0x38,
  DW_AT_decl_column: 0x39,
  DW_AT_decl_file: 0x3a,
  DW_AT_decl_line: 0x3b,
  DW_AT_declaration: 0x3c,
  DW_AT_discr_list: 0x3d,
  DW_AT_encoding: 0x3e,
  DW_AT_external: 0x3f,
  DW_AT_frame_base: 0x40,
  DW_AT_friend: 0x41,
  DW_AT_identifier_case: 0x42,
  DW_AT_macro_info: 0x43,
  DW_AT_namelist_item: 0x44,
  DW_AT_priority: 0x45,
  DW_AT_segment: 0x46,
  DW_AT_specification: 0x47,
  DW_AT_static_link: 0x48,
  DW_AT_type: 0x49,
  DW_AT_use_location: 0x4a,
  DW_AT_variable_parameter: 0x4b,
  DW_AT_virtuality: 0x4c,
  DW_AT_vtable_elem_location: 0x4d,
  // New in DWARF v3:
  DW_AT_allocated: 0x4e,
  DW_AT_associated: 0x4f,
  DW_AT_data_location: 0x50,
  DW_AT_byte_stride: 0x51,
  DW_AT_entry_pc: 0x52,
  DW_AT_use_UTF8: 0x53,
  DW_AT_extension: 0x54,
  DW_AT_ranges: 0x55,
  DW_AT_trampoline: 0x56,
  DW_AT_call_column: 0x57,
  DW_AT_call_file: 0x58,
  DW_AT_call_line: 0x59,
  DW_AT_description: 0x5a,
  DW_AT_binary_scale: 0x5b,
  DW_AT_decimal_scale: 0x5c,
  DW_AT_small: 0x5d,
  DW_AT_decimal_sign: 0x5e,
  DW_AT_digit_count: 0x5f,
  DW_AT_picture_string: 0x60,
  DW_AT_mutable: 0x61,
  DW_AT_threads_scaled: 0x62,
  DW_AT_explicit: 0x63,
  DW_AT_object_pointer: 0x64,
  DW_AT_endianity: 0x65,
  DW_AT_elemental: 0x66,
  DW_AT_pure: 0x67,
  DW_AT_recursive: 0x68,
  // New in DWARF v4:
  DW_AT_signature: 0x69,
  DW_AT_main_subprogram: 0x6a,
  DW_AT_data_bit_offset: 0x6b,
  DW_AT_const_expr: 0x6c,
  DW_AT_enum_class: 0x6d,
  DW_AT_linkage_name: 0x6e,
  // New in DWARF v5:
  DW_AT_string_length_bit_size: 0x6f,
  DW_AT_string_length_byte_size: 0x70,
  DW_AT_rank: 0x71,
  DW_AT_str_offsets_base: 0x72,
  DW_AT_addr_base: 0x73,
  DW_AT_rnglists_base: 0x74,
  DW_AT_dwo_id: 0x75,
  DW_AT_dwo_name: 0x76,
  DW_AT_reference: 0x77,
  DW_AT_rvalue_reference: 0x78,
  DW_AT_macros: 0x79,
  DW_AT_call_all_calls: 0x7a,
  DW_AT_call_all_source_calls: 0x7b,
  DW_AT_call_all_tail_calls: 0x7c,
  DW_AT_call_return_pc: 0x7d,
  DW_AT_call_value: 0x7e,
  DW_AT_call_origin: 0x7f,
  DW_AT_call_parameter: 0x80,
  DW_AT_call_pc: 0x81,
  DW_AT_call_tail_call: 0x82,
  DW_AT_call_target: 0x83,
  DW_AT_call_target_clobbered: 0x84,
  DW_AT_call_data_location: 0x85,
  DW_AT_call_data_value: 0x86,
  DW_AT_noreturn: 0x87,
  DW_AT_alignment: 0x88,
  DW_AT_export_symbols: 0x89,
  DW_AT_deleted: 0x8a,
  DW_AT_defaulted: 0x8b,
  DW_AT_loclists_base: 0x8c,
  
  // Vendor extensions:
  DW_AT_GHS_namespace_alias: 0x806,
  DW_AT_GHS_using_namespace: 0x807,
  DW_AT_GHS_using_declaration: 0x808,
  
  DW_AT_MIPS_fde: 0x2001,
  DW_AT_MIPS_loop_begin: 0x2002,
  DW_AT_MIPS_tail_loop_begin: 0x2003,
  DW_AT_MIPS_epilog_begin: 0x2004,
  DW_AT_MIPS_loop_unroll_factor: 0x2005,
  DW_AT_MIPS_software_pipeline_depth: 0x2006,
  DW_AT_MIPS_linkage_name: 0x2007,
  // Conflicting:
  // DW_AT_GHS_mangled: 0x2007,
  DW_AT_MIPS_stride: 0x2008,
  DW_AT_MIPS_abstract_name: 0x2009,
  DW_AT_MIPS_clone_origin: 0x200a,
  DW_AT_MIPS_has_inlines: 0x200b,
  DW_AT_MIPS_stride_byte: 0x200c,
  DW_AT_MIPS_stride_elem: 0x200d,
  DW_AT_MIPS_ptr_dopetype: 0x200e,
  DW_AT_MIPS_allocatable_dopetype: 0x200f,
  DW_AT_MIPS_assumed_shape_dopetype: 0x2010,
  
  // This one appears to have only been implemented by Open64 for
  // fortran and may conflict with other extensions.
  DW_AT_MIPS_assumed_size: 0x2011,
  
  // HP  0x2001-0x2011 conflict with MIPS
  // DW_AT_HP_unmodifiable: 0x2001,
  // DW_AT_HP_prologue: 0x2005,
  // DW_AT_HP_epilogue: 0x2008,
  // DW_AT_HP_actuals_stmt_list: 0x2010,
  // DW_AT_HP_proc_per_section: 0x2011,
  
  DW_AT_HP_raw_data_ptr: 0x2012,
  DW_AT_HP_pass_by_reference: 0x2013,
  DW_AT_HP_opt_level: 0x2014,
  DW_AT_HP_prof_version_id: 0x2015,
  DW_AT_HP_opt_flags: 0x2016,
  DW_AT_HP_cold_region_low_pc: 0x2017,
  DW_AT_HP_cold_region_high_pc: 0x2018,
  DW_AT_HP_all_variables_modifiable: 0x2019,
  DW_AT_HP_linkage_name: 0x201a,
  DW_AT_HP_prof_flags: 0x201b,
  DW_AT_HP_unit_name: 0x201f,
  DW_AT_HP_unit_size: 0x2020,
  DW_AT_HP_widened_byte_size: 0x2021,
  DW_AT_HP_definition_points: 0x2022,
  DW_AT_HP_default_location: 0x2023,
  DW_AT_HP_is_result_param: 0x2029,
  
  // COMPAQ/HP Conflicts with MIPS/HP  0x2001 - 0x2005
  // DW_AT_CPQ_discontig_ranges: 0x2001,
  // DW_AT_CPQ_semantic_events: 0x2002,
  // DW_AT_CPQ_split_lifetimes_var: 0x2003,
  // DW_AT_CPQ_split_lifetimes_rtn: 0x2004,
  // DW_AT_CPQ_prologue_length: 0x2005,
  
  DW_AT_DW_AT_INTEL_other_endian: 0x2026,
  
  // Green Hills.
  DW_AT_GHS_rsm: 0x2083,
  DW_AT_GHS_frsm: 0x2085,
  DW_AT_GHS_frames: 0x2086,
  DW_AT_GHS_rso: 0x2087,
  DW_AT_GHS_subcpu: 0x2092,
  DW_AT_GHS_lbrace_line: 0x2093,
  
  // GNU extensions
  DW_AT_sf_names: 0x2101,
  DW_AT_src_info: 0x2102,
  DW_AT_mac_info: 0x2103,
  DW_AT_src_coords: 0x2104,
  DW_AT_body_begin: 0x2105,
  DW_AT_body_end: 0x2106,
  DW_AT_GNU_vector: 0x2107,
  DW_AT_GNU_odr_signature: 0x210f,
  DW_AT_GNU_template_name: 0x2110,
  DW_AT_GNU_call_site_value: 0x2111,
  DW_AT_GNU_call_site_data_value: 0x2112,
  DW_AT_GNU_call_site_target: 0x2113,
  DW_AT_GNU_call_site_target_clobbered: 0x2114,
  DW_AT_GNU_tail_call: 0x2115,
  DW_AT_GNU_all_tail_call_sites: 0x2116,
  DW_AT_GNU_all_call_sites: 0x2117,
  DW_AT_GNU_all_source_call_sites: 0x2118,
  DW_AT_GNU_macros: 0x2119,
  DW_AT_GNU_deleted: 0x211a,
  // Extensions for Fission proposal.
  DW_AT_GNU_dwo_name: 0x2130,
  DW_AT_GNU_dwo_id: 0x2131,
  DW_AT_GNU_ranges_base: 0x2132,
  DW_AT_GNU_addr_base: 0x2133,
  DW_AT_GNU_pubnames: 0x2134,
  DW_AT_GNU_pubtypes: 0x2135,
  DW_AT_GNU_discriminator: 0x2136,
  DW_AT_GNU_locviews: 0x2137,
  DW_AT_GNU_entry_view: 0x2138,
  
  DW_AT_SUN_template: 0x2201,
  // Conflicting:
  // HANDLE_DW_AT(0x2201, VMS_rtnbeg_pd_address);
  
  DW_AT_SUN_alignment: 0x2202,
  DW_AT_SUN_vtable: 0x2203,
  DW_AT_SUN_count_guarantee: 0x2204,
  DW_AT_SUN_command_line: 0x2205,
  DW_AT_SUN_vbase: 0x2206,
  DW_AT_SUN_compile_options: 0x2207,
  DW_AT_SUN_language: 0x2208,
  DW_AT_SUN_browser_file: 0x2209,
  DW_AT_SUN_vtable_abi: 0x2210,
  DW_AT_SUN_func_offsets: 0x2211,
  DW_AT_SUN_cf_kind: 0x2212,
  DW_AT_SUN_vtable_index: 0x2213,
  DW_AT_SUN_omp_tpriv_addr: 0x2214,
  DW_AT_SUN_omp_child_func: 0x2215,
  DW_AT_SUN_func_offset: 0x2216,
  DW_AT_SUN_memop_type_ref: 0x2217,
  DW_AT_SUN_profile_id: 0x2218,
  DW_AT_SUN_memop_signature: 0x2219,
  
  DW_AT_SUN_obj_dir: 0x2220,
  DW_AT_SUN_obj_file: 0x2221,
  DW_AT_SUN_original_name: 0x2222,
  DW_AT_SUN_hwcprof_signature: 0x2223,
  DW_AT_SUN_amd64_parmdump: 0x2224,
  DW_AT_SUN_part_link_name: 0x2225,
  DW_AT_SUN_link_name: 0x2226,
  DW_AT_SUN_pass_with_const: 0x2227,
  DW_AT_SUN_return_with_const: 0x2228,
  DW_AT_SUN_import_by_name: 0x2229,
  DW_AT_SUN_90_pointer: 0x222a,
  DW_AT_SUN_pass_by_ref: 0x222b,
  DW_AT_SUN_f90_allocatable: 0x222c,
  DW_AT_SUN_f90_assumed_shape_array: 0x222d,
  DW_AT_SUN_c_vla: 0x222e,
  DW_AT_SUN_return_value_ptr: 0x2230,
  DW_AT_SUN_dtor_start: 0x2231,
  DW_AT_SUN_dtor_length: 0x2232,
  DW_AT_SUN_dtor_state_initial: 0x2233,
  DW_AT_SUN_dtor_state_final: 0x2234,
  DW_AT_SUN_dtor_state_deltas: 0x2235,
  DW_AT_SUN_import_by_lname: 0x2236,
  DW_AT_SUN_f90_use_only: 0x2237,
  DW_AT_SUN_namelist_spec: 0x2238,
  DW_AT_SUN_is_omp_child_func: 0x2239,
  DW_AT_SUN_fortran_main_alias: 0x223a,
  DW_AT_SUN_fortran_based: 0x223b,
  
  DW_AT_ALTIUM_loclist: 0x2300,
  
  DW_AT_use_GNAT_descriptive_type: 0x2301,
  DW_AT_GNAT_descriptive_type: 0x2302,
  DW_AT_GNU_numerator: 0x2303,
  DW_AT_GNU_denominator: 0x2304,
  DW_AT_GNU_bias: 0x2305,
  
  DW_AT_GO_kind: 0x2900,
  DW_AT_GO_key: 0x2901,
  DW_AT_GO_elem: 0x2902,
  DW_AT_GO_embedded_field: 0x2903,
  DW_AT_GO_runtime_type: 0x2904,
  
  DW_AT_UPC_threads_scaled: 0x3210,
  
  DW_AT_IBM_wsa_addr: 0x393e,
  DW_AT_IBM_home_location: 0x393f,
  DW_AT_IBM_alt_srcview: 0x3940,
  
  // PGI extensions (STMicroelectronics)
  DW_AT_PGI_lbase: 0x3a00,
  DW_AT_PGI_soffset: 0x3a01,
  DW_AT_PGI_lstride: 0x3a02,
  
  // Borland extensions.
  DW_AT_BORLAND_property_read: 0x3b11,
  DW_AT_BORLAND_property_write: 0x3b12,
  DW_AT_BORLAND_property_implements: 0x3b13,
  DW_AT_BORLAND_property_index: 0x3b14,
  DW_AT_BORLAND_property_default: 0x3b15,
  DW_AT_BORLAND_Delphi_unit: 0x3b20,
  DW_AT_BORLAND_Delphi_class: 0x3b21,
  DW_AT_BORLAND_Delphi_record: 0x3b22,
  DW_AT_BORLAND_Delphi_metaclass: 0x3b23,
  DW_AT_BORLAND_Delphi_constructor: 0x3b24,
  DW_AT_BORLAND_Delphi_destructor: 0x3b25,
  DW_AT_BORLAND_Delphi_anonymous_method: 0x3b26,
  DW_AT_BORLAND_Delphi_interface: 0x3b27,
  DW_AT_BORLAND_Delphi_ABI: 0x3b28,
  DW_AT_BORLAND_Delphi_return: 0x3b29,
  DW_AT_BORLAND_Delphi_frameptr: 0x3b30,
  DW_AT_BORLAND_closure: 0x3b31,
  // LLVM project extensions.
  DW_AT_LLVM_include_path: 0x3e00,
  DW_AT_LLVM_config_macros: 0x3e01,
  DW_AT_LLVM_sysroot: 0x3e02,
  DW_AT_LLVM_tag_offset: 0x3e03,
  DW_AT_LLVM_ptrauth_key: 0x3e04,
  DW_AT_LLVM_ptrauth_address_discriminated: 0x3e05,
  DW_AT_LLVM_ptrauth_extra_discriminator: 0x3e06,
  DW_AT_LLVM_apinotes: 0x3e07,
  DW_AT_LLVM_ptrauth_isa_pointer: 0x3e08,
  DW_AT_LLVM_ptrauth_authenticates_null_values: 0x3e09,
  DW_AT_LLVM_ptrauth_authentication_mode: 0x3e0a,
  
  // Apple extensions.
  
  DW_AT_APPLE_optimized: 0x3fe1,
  DW_AT_APPLE_flags: 0x3fe2,
  DW_AT_APPLE_isa: 0x3fe3,
  DW_AT_APPLE_block: 0x3fe4,
  DW_AT_APPLE_major_runtime_vers: 0x3fe5,
  DW_AT_APPLE_runtime_class: 0x3fe6,
  DW_AT_APPLE_omit_frame_ptr: 0x3fe7,
  DW_AT_APPLE_property_name: 0x3fe8,
  DW_AT_APPLE_property_getter: 0x3fe9,
  DW_AT_APPLE_property_setter: 0x3fea,
  DW_AT_APPLE_property_attribute: 0x3feb,
  DW_AT_APPLE_objc_complete_type: 0x3fec,
  DW_AT_APPLE_property: 0x3fed,
  DW_AT_APPLE_objc_direct: 0x3fee,
  DW_AT_APPLE_sdk: 0x3fef,
  DW_AT_APPLE_origin: 0x3ff0,
}

export type DW_AT_KEY = keyof typeof DW_AT;