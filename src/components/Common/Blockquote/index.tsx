import React from 'react';
// Auxiliary Functions
import { convertInString } from '../../../auxiliary-functions/js/сonvert';
// Styles
import styles from './blockquote.module.scss';
// Types
interface Props {
  blockquote: string;
  author: string;
  cssClasses?: { box?: string; blockquote?: string; author?: string };
}

const Blockquote: React.FC<Props> = ({ blockquote, author, cssClasses }) => {
  return (
    <figure className={convertInString(styles.box, cssClasses?.box)}>
      <blockquote
        className={convertInString(
          styles.main,
          cssClasses?.blockquote,
          'active-color-1'
        )}
      >
        “{blockquote}“
      </blockquote>
      <figcaption
        className={convertInString(
          styles.author,
          cssClasses?.author,
          'active-color-1'
        )}
      >
        &mdash; {author}
      </figcaption>
    </figure>
  );
};

export default Blockquote;
