import AppNavigation from './navigation/appNavigation';
import registerNNPushToken from 'native-notify';


export default function App() {
  registerNNPushToken(20285, 'QvRQGr0pP8qfyd8DVp5DL5')
  return (
    <AppNavigation/>
  );
}
