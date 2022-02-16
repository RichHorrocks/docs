import PropTypes from 'prop-types';
import React, {useContext} from 'react';
import {Link as GatsbyLink} from 'gatsby';
import {Link} from '@chakra-ui/react';
import {PathContext, isUrl} from '../utils';
import {isAbsolute, resolve} from 'path';

export function ColorLink(props) {
  return <Link color="primary" {...props} />;
}

export default function RelativeLink({href, ...props}) {
  const {path} = useContext(PathContext);

  if (!href) {
    return <a {...props} />;
  }

  const isExternal = isUrl(href);
  const linkProps =
    isExternal || href.startsWith('#')
      ? {href, isExternal}
      : {as: GatsbyLink, to: isAbsolute(href) ? href : resolve(path, href)};

  return <ColorLink {...linkProps} {...props} />;
}

RelativeLink.propTypes = {
  href: PropTypes.string.isRequired
};
