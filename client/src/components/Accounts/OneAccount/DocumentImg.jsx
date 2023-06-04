import idPlaceholder from "../../../assets/images/id-placeholder.png";

function DocumentImg({ account, hash }) {
  return <img src={account.documentId ? "http://localhost:5000/api/documents/" + account.documentId + "/" + hash : idPlaceholder} width={100} alt={account.documentId ? account.name + " " + account.surname + " dokumento kopija" : "dokumento kopijos nėra paveiksliukas"} />;
}

export default DocumentImg;
