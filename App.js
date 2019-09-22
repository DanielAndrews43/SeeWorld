import React, { useState, useEffect, useRef } from 'react'
import { RNCamera } from 'react-native-camera'
import styled from 'styled-components/native'
// import Tts from 'react-native-tts'
// const vision = require('@google-cloud/vision')

// const client = new vision.ImageAnnotatorClient()

const EmptyView = styled.View`
  background-color: yellow;
`

const NeedPermissionView = styled.View`
  justify-content: center;
  align-items: center;
  background-color: red;
`

const NoPermissionText = styled.Text``

const Container = styled.TouchableOpacity`
  flex: 1;
  background-color: blue;
`

const StyledCamera = styled(RNCamera)`
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
      console.warn(newPhoto)
      setPhoto(newPhoto)

      // const [result] = await client.labelDetection(newPhoto)
      // const labels = result.labelAnnotations
      // labels.forEach(label => console.warn(label.description))
      // labels.forEach(label => Tts.speak(label))
    }
  }

  // useEffect(() => {
  //   askPermission()
  // })

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
        <StyledCamera ref={cameraRef} type={RNCamera.Constants.Type.back} />
        {photo && <Image source={photo} />}
      </Container>
    )
  }
}

export default App
