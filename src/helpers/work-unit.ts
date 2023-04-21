export default interface WorkUnit {
  organization_unit_name: string;
  organization_unit_code: string;
  address: string;
  children: any[];
  [index: string | number]: string | any;
}
