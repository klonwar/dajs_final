import React, {FC, MouseEventHandler, Ref} from "react";
import LanguagesList from "#components/languages-list/languages-list";

interface Props {
  title?: string;
  subtitle?: string;
  language?: Array<string>;
  bookKey: string;
  authorName?: Array<string>;

  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;

  bookRef?: Ref<any>
}

const BookCard: FC<Props> = (props) => {
  const {
    bookKey,
    title = ``,
    subtitle = ``,
    language = [],
    authorName = [],
    className = ``,
    onClick,
    children = [],
    bookRef
  } = props;

  return (
    <div onClick={onClick} className={`BookCard ${className}`}
         ref={bookRef}>
      <label className={`BookCard-title`}>{title}</label>
      <span className={`BookCard-subtitle`}>{subtitle}</span>
      <span className={`BookCard-author`}>{authorName.join(`, `) || `???`}</span>
      <LanguagesList bookKey={bookKey} languages={language} />
      {children}
    </div>
  );
};

export default BookCard;
