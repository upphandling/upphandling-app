import {
  Button,
  Card,
  CheckBox,
  StyleService,
  Text,
} from '@ui-kitten/components'
import React from 'react'
import { View } from 'react-native'
import { useIssues } from '../hooks/useGithub'
import { ImageOverlay } from './ImageOverlay'

const tag = (label, index) => (
  <Button
    key={index}
    style={styles.detailItem}
    appearance="outline"
    size="small"
  >
    {label.name}
  </Button>
)

export const Issues = ({ url, selected, onSelectedChange }) => {
  if (!url) return <Text>No repo</Text>
  const urlWithoutProtocol = url
    .toLowerCase()
    .replace('https://', '')
    .replace('http://', '')
  const [owner, repo] = urlWithoutProtocol.split('?')[0].split('/').slice(-2)
  const { data, error, isFetching } = useIssues(owner, repo)
  if (isFetching)
    return (
      <Text>
        Loading...{owner} {repo}
      </Text>
    )
  if (error)
    return (
      <Text>
        Error loading issues: {error.message} {owner} {repo}
      </Text>
    )

  const toggle = (issue, checked) => {
    if (checked) {
      onSelectedChange([...selected, issue])
    } else {
      onSelectedChange(selected.filter((s) => s.id !== issue.id))
    }
  }

  return (
    <View style={styles.container}>
      {data.map((issue) => (
        <View style={styles.row}>
          <CheckBox checked={selected.includes(issue)} onChange={(checked) => toggle(issue, checked) }/>
          <View style={styles.issue} key={issue.id}>
            <Text category="h6">
              #{issue.number} {issue.title}
            </Text>
            <Text category="s1" style={styles.body}>
              {issue.body}
            </Text>
            <View style={styles.tags}>
              {issue.labels.map((label, index) => tag(label, index))}
            </View>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleService.create({
  image: {
    height: 100,
  },
  row: {
    flexDirection: 'row',
  },
  issue: {
    marginLeft: 16,
    marginBottom: 16,
  },
  tags: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 4,
  },
  container: { marginHorizontal: 16 },
  detailItem: {
    borderRadius: 16,
  },
  body: {
    overflow: '',
    maxHeight: 100,
  },
})
