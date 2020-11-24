import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * https://stackoverflow.com/a/3177838
 */
const timeSince = (date) => {
  const seconds = Math.floor((new Date() - date) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }
  return `${Math.floor(seconds)} seconds ago`;
};

const RepoLink = ({ nameWithOwner }) => (
  <a href={`https://github.com/${nameWithOwner}`}>
    {nameWithOwner}
  </a>
);
RepoLink.propTypes = {
  nameWithOwner: PropTypes.string.isRequired,
};

const Fork = ({ info }) => (
  <tr>
    <td><RepoLink nameWithOwner={info.nameWithOwner} /></td>
    <td>{info.stargazerCount}</td>
    <td>{info.forkCount}</td>
    <td>{info.object.history.totalCount}</td>
    <td>{timeSince(Date.parse(info.pushedAt))}</td>
  </tr>
);
Fork.propTypes = {
  info: PropTypes.shape({
    nameWithOwner: PropTypes.string.isRequired,
    stargazerCount: PropTypes.number.isRequired,
    forkCount: PropTypes.number.isRequired,
    pushedAt: PropTypes.string.isRequired,
    object: PropTypes.shape({
      history: PropTypes.shape({
        totalCount: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
};

const ResultTable = ({ forks }) => (
  <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>
            <FontAwesomeIcon icon={['fab', 'github-alt']} />
            {' '}
            Repo
          </th>
          <th>
            <FontAwesomeIcon icon="star" />
            {' '}
            Stars
          </th>
          <th>
            <FontAwesomeIcon icon="code-branch" />
            {' '}
            Forks
          </th>
          <th>
            <FontAwesomeIcon icon="dot-circle" />
            {' '}
            Commits
          </th>
          <th>
            <FontAwesomeIcon icon="calendar-alt" />
            {' '}
            Modified
          </th>
        </tr>
      </thead>
      <tbody>
        { forks.map((fork) => <Fork key={fork.nameWithOwner} info={fork} />)}
      </tbody>
    </Table>
  </>
);
ResultTable.propTypes = {
  forks: PropTypes.arrayOf(Fork.propTypes.info).isRequired,
};

export default ResultTable;