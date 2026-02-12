import type { GridColDef } from "@mui/x-data-grid";
import type { JSX } from "react";
import type { UseFormReturn } from "react-hook-form";
import ApiClient from "../../../services/axios";
export interface EntityFormRenderProps {
  mode: "create" | "edit";
  data?: any;
  onSubmit: (payload: any) => void;
  formMethods: UseFormReturn<any>;
}

export interface EntityConfig {
  idKey: string;
  name: string;
  label: string;

  searchKey?: string;

  permission?: {
    create?: boolean;
    update?: boolean;
    delete?: boolean;
  };

  api: ApiClient;

  getColumns: (actions?: {
    onEdit?: (row: any) => void;
    onDelete?: (row: any) => void;
    onView?: (payload: {
      title: string;
      content: JSX.Element | null;
      id?: number;
      quickUpdate?: (id: number, data?: any) => Promise<any>;
      formMethods?: UseFormReturn<any>;
    }) => void;
  }) => GridColDef[];

  selectContent?: () => JSX.Element;

  customFormComponents?: (data?: any) => JSX.Element;

  renderForm: (props: EntityFormRenderProps) => JSX.Element;

}
