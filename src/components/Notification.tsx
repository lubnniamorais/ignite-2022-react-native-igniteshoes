import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import {
  CloseIcon,
  HStack,
  Icon,
  IconButton,
  Pressable,
  Text,
} from 'native-base';
import type { OSNotification } from 'react-native-onesignal';

type Props = {
  data: OSNotification;
  onClose: () => void;
};

export function Notification({ data, onClose }: Props) {
  function handleOnPress() {
    if (data.launchURL) {
      Linking.openURL(data.launchURL);
    }
  }

  return (
    <Pressable
      w='full'
      p={4}
      pt={12}
      bgColor='gray.200'
      position='absolute'
      top={0}
      onPress={handleOnPress}
    >
      <HStack justifyContent='space-between' alignItems='center'>
        <Icon
          as={Ionicons}
          name='notifications-outline'
          size={5}
          color='black'
          mr={2}
        />

        <Text fontSize='md' color='black' flex={1}>
          {data.title}
        </Text>

        <IconButton
          variant='unstyled'
          _focus={{ borderWidth: 0 }}
          icon={<CloseIcon size='3' />}
          _icon={{ color: 'coolGray.600' }}
          color='black'
          onPress={onClose}
        />
      </HStack>
    </Pressable>
  );
}
