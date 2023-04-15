import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input
} from '@chakra-ui/react'
import { FC, useState } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Controller, useFieldArray } from 'react-hook-form'
import { AddIcon, MinusIcon } from '@chakra-ui/icons'

interface SecretMessageProps {
  control: any
  validateFileSize(file: File | null, limit: number): string | true
}

const SecretMessageForm: FC<SecretMessageProps> = ({
  control,
  validateFileSize
}) => {
  const { t } = useTranslation('common')
  const {
    fields: linkedDecryptTokenIdFields,
    append: linkedDecryptTokenIdAppend,
    remove: linkedDecryptTokenIdRemove
  } = useFieldArray({
    control,
    name: 'linkedDecryptTokenIds'
  })
  const [isShowLinkedDecryptTokenIds, toggleShowLinkedDecryptTokenIds] =
    useState(false)
  return (
    <>
      <FormControl mt={5}>
        <FormLabel mt="1em" htmlFor="secretMessage">
          {t('NEW_TICKET_SECRET_MESSAGE_LABEL')}
        </FormLabel>
        <Controller
          control={control}
          name="secretMessage"
          rules={{
            validate: (v) => validateFileSize(v, 0.5)
          }}
          render={({ field: { onChange }, fieldState }) => (
            <>
              <Input
                variant="unstyled"
                p={1}
                id="secretMessage"
                type="file"
                accept={'image/*'}
                onChange={(e) =>
                  e.target.files ? onChange(e.target.files[0]) : false
                }
              />
              <Box color="red.300">{fieldState.error?.message}</Box>
            </>
          )}
        />
      </FormControl>

      <FormControl>
        {!isShowLinkedDecryptTokenIds ? (
          <>
            <FormLabel mt="1em" htmlFor="linkedDecryptTokenIds" fontSize="sm">
              {t('NEW_TICKET_CONDITIONS_SECRET_MESSAGE_LABEL')}
            </FormLabel>
            <Button
              size="sm"
              onClick={() => {
                linkedDecryptTokenIdAppend({
                  tokenId: null
                })
                toggleShow((bool) => !bool)
              }}
            >
              {t('ADD_LINKED_DECRYPT_TOKEN_IDS_BUTTON_LABEL')}
            </Button>
          </>
        ) : (
          <>
            <FormLabel mt="1em" htmlFor="linkedDecryptTokenIds" fontSize="sm">
              {t('NEW_TICKET_SECRET_LINKED_DECRYPT_TOKEN_IDS_LABEL')}
            </FormLabel>
            <Flex justifyContent="flex-start" flexWrap="wrap">
              {linkedDecryptTokenIdFields.map((field, index) => (
                <Controller
                  control={control}
                  name={`linkedDecryptTokenIds.${index}.tokenId`}
                  rules={{
                    required: t('REQUIRED_INPUT')
                  }}
                  key={field.id}
                  render={({ field: { onChange, value } }) => (
                    <Box mr={2} mb={3}>
                      <Input
                        variant="outline"
                        type="number"
                        width="60px"
                        placeholder="ID"
                        textAlign="right"
                        value={String(value)}
                        isRequired
                        onChange={(v) => {
                          onChange(v)
                        }}
                      />
                    </Box>
                  )}
                />
              ))}
            </Flex>
            <Flex justifyContent="flex-end" mt={3}>
              <IconButton
                colorScheme="teal"
                aria-label="Add Wallet Address"
                size="md"
                icon={<AddIcon />}
                onClick={() =>
                  linkedDecryptTokenIdAppend({
                    tokenId: null
                  })
                }
                mr={2}
              />
              <IconButton
                colorScheme="teal"
                aria-label="Add Wallet Address"
                size="md"
                icon={<MinusIcon />}
                onClick={() => {
                  linkedDecryptTokenIdRemove(
                    linkedDecryptTokenIdFields.length - 1
                  )
                  linkedDecryptTokenIdFields.length <= 1 &&
                    toggleShowLinkedDecryptTokenIds((bool) => !bool)
                }}
              />
            </Flex>
          </>
        )}
      </FormControl>
    </>
  )
}

export default SecretMessageForm
