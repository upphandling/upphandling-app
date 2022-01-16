import { useQuery } from 'react-query'
import { getIssues } from '../api/github'

export const useIssues = (owner, repo) => {
  return useQuery('issues', () => getIssues(owner, repo))
}
