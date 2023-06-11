import { Box, Button, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { useInitPush } from '@/hooks/usePushProtocol'
import { Chat, ENV } from '@pushprotocol/uiweb'
import { useAccount, useSigner } from 'wagmi'
import { Signer } from 'ethers'
import styles from './ChatModal.module.css'
import useTranslation from 'next-translate/useTranslation'

type Props = {
  receiverAddress: string
}

const ChatModal: FC<Props> = ({ receiverAddress }) => {
  const { user, createUser } = useInitPush()
  const { t, lang } = useTranslation('ticket')
  const { data } = useSigner()
  const { address } = useAccount()

  return (
    <>
      <Box
        className={[styles.chatWrapper, lang === 'en' ? styles.isEN : ''].join(
          ' '
        )}
      >
        <Text fontSize="l" as="b">
          {t('TITLE.CONTACT_ORGANIZERS')}
        </Text>
        {user ? (
          <Box mt={2}>
            <Chat
              account={address as string}
              supportAddress={receiverAddress}
              signer={data as Signer}
              env={ENV.STAGING}
              modalTitle={t('CHAT')}
              greetingMsg={t('GREETING_MSG')}
            />
          </Box>
        ) : (
          <Button onClick={createUser} width="full" mt={2}>
            {t('CONNECT_TO_CHAT')}
          </Button>
        )}
      </Box>
    </>
  )
}

export default ChatModal
