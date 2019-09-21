import React, { useState, useEffect, useRef } from 'react'
import * as Permissions from 'expo-permissions'
import { Camera } from 'expo-camera'
import styled from 'styled-components/native'

const EmptyView = styled.View``

const NeedPermissionView = styled.View`
  justify-content: center;
  align-items: center;
`

const NoPermissionText = styled.Text``

const Container = styled.TouchableOpacity`
  flex: 1;
`

const StyledCamera = styled(Camera)`
  flex: 1;
`

const Image = styled.Image`
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`

function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [photo, setPhoto] = useState(null)
  const cameraRef = useRef(null)

  const askPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    setHasPermission(status === 'granted')
  }

  const takePhoto = async () => {
    if (cameraRef) {
      let newPhoto = await cameraRef.takePictureAsync()
      setPhoto(newPhoto)
    }
  }

  useEffect(() => {
    askPermission()
  })

  if (hasPermission === null) {
    return <EmptyView />
  } else if (hasPermission === false) {
    return (
      <NeedPermissionView>
        <NoPermissionText>No access to camera</NoPermissionText>
      </NeedPermissionView>
    )
  } else {
    return (
      <Container onPress={takePhoto}>
        <StyledCamera ref={cameraRef} type={Camera.Constants.Type.back} />
        {photo && <Image source={photo} />}
      </Container>
    )
  }
}

export default App
