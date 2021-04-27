import React, {FC} from "react";

interface Props {
  languages?: Array<string>;
  bookKey: string;
}

const LanguagesList: FC<Props> = ({bookKey, languages= []}) => {
  return (
    <div className={`LanguagesContainer`}>
      {languages.map((language) => (
        <span className={`LanguagesContainer-item`} key={`${bookKey}-${language}`}>
                      {language}
                    </span>
      ))}
    </div>
  );
};

export default LanguagesList;
