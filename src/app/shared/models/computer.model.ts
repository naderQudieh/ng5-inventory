export class Computer {

  constructor(
    public type: string, // desktop or notebook
    public config: string,
    public software: string,
    public department: string,
    public employeeName: string,
    public description: string,
    public location: string,
    public inv_num?: string,
    public warrantyUntil?: string
  ) {}
}
