import { useRef, useState } from "react";
export default function useFileReader() {
  const [inputFileForDisplay, setInputFileForDisplay] = useState(null);
  const fileInput = useRef(null);

  const fileReader = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_) => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const readInputFile = (e) => {
    fileInput.current = e.target;
    fileReader(e.target.files[0])
      .then((f) => {
        setInputFileForDisplay(f);
      })
      .catch((_) => _);
  };

  const removeInputFile = (_) => {
    if (fileInput.current !== null) {
      fileInput.current.value = null;
    }
    setInputFileForDisplay(null);
  };

  return [fileInput, inputFileForDisplay, readInputFile, removeInputFile, setInputFileForDisplay];
}
