import {
  ObjectInputMember,
  PatchEvent,
  set,
  unset,
  type ObjectInputProps
} from 'sanity'
import styled from 'styled-components'

type MediaType = 'image' | 'video'

const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const TabList = styled.div`
  display: flex;
  gap: 8px;
`

const TabButton = styled.button<{ $selected: boolean }>`
  appearance: none;
  border: 1px solid #f2f3f5;
  border-radius: 3px;
  background: ${({ $selected }) => ($selected ? '#f2f3f5' : 'transparent')};
  color: ${({ $selected }) => ($selected ? '#1469ff' : '#f2f3f5')};
  cursor: pointer;
  padding: 8px 12px;
`

export function MediaAssetInput(props: ObjectInputProps) {
  const { members, value, onChange } = props
  const mediaType = (value?.mediaType as MediaType | undefined) ?? 'image'

  const imageMember = members.find(
    (member) => member.kind === 'field' && member.name === 'image'
  )
  const videoMember = members.find(
    (member) => member.kind === 'field' && member.name === 'video'
  )

  const setMediaType = (next: MediaType) => {
    onChange(
      PatchEvent.from([
        set(next, ['mediaType']),
        next === 'image' ? unset(['video']) : unset(['image'])
      ])
    )
  }

  return (
    <Root>
      <TabList role="tablist" aria-label="Media type">
        <TabButton
          type="button"
          role="tab"
          aria-selected={mediaType === 'image'}
          $selected={mediaType === 'image'}
          onClick={() => setMediaType('image')}
        >
          Image
        </TabButton>
        <TabButton
          type="button"
          role="tab"
          aria-selected={mediaType === 'video'}
          $selected={mediaType === 'video'}
          onClick={() => setMediaType('video')}
        >
          Video
        </TabButton>
      </TabList>

      {mediaType === 'image' && imageMember?.kind === 'field' && (
        <ObjectInputMember member={imageMember} {...props} />
      )}
      {mediaType === 'video' && videoMember?.kind === 'field' && (
        <ObjectInputMember member={videoMember} {...props} />
      )}
    </Root>
  )
}
