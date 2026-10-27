declare module "virtual:company-questions" {
  export type CompanyQuestionDocument = {
    fileName: string;
    title: string;
  };

  const documents: CompanyQuestionDocument[];
  export default documents;
}
