/*
 * This class is an easy way to parse and work with the return codes from the API
 */
export class ReturnCode {
    Code: number;
    Name: string;
    Description: string;
  
    constructor(code, name, description) {
      this.Code = code;
      this.Name = name;
      this.Description = description;
    }
  }