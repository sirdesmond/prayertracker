import offline from 'react-native-simple-store'

export default (store) => {

  store.subscribe(() => {
    const showWelcome = store.getState().showWelcome

    if (!showWelcome) {
      offline.save('showWelcome', true)
    }else{
      offline.save('showWelcome', false)
    }
  })
}
