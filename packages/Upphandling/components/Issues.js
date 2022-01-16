import { Button, Card, StyleService, Text } from '@ui-kitten/components'
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

export const Issues = ({url}) => {
  if (!url) return <Text>No repo</Text>
  const urlWithoutProtocol = url.toLowerCase().replace('https://', '').replace('http://', '')
  const [owner, repo] = urlWithoutProtocol.split('?')[0].split('/').slice(-2)
  const { data, error, isFetching } = useIssues(owner, repo)
  if (isFetching) return <Text>Loading...{owner} {repo}</Text>
  if (error) return <Text>Error loading issues: {error.message} {owner} {repo}</Text>

  return (
    <View>
      {data.map((issue) => (
        <Card key={issue.id}>
          <Text category="h6" >#{issue.number} {issue.title}</Text>
          <Text category="s1" style={styles.body}>{issue.body}</Text>
          <View style={styles.tags}>
            {issue.labels.map((label, index) => tag(label, index))}
          </View>
        </Card>
      ))}
    </View>
  )
}

const styles = StyleService.create({
  image: {
    height: 100,
  },
  tags: {
    flexDirection: 'row',
    marginHorizontal: -4,
    marginVertical: 4,
  },
  detailItem: {
    marginHorizontal: 4,
    borderRadius: 16,
  },
  body: {
    overflow: '',
    maxHeight: 100,
  }
})