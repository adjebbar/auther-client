import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatRelative, fromUnixTime } from 'date-fns'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Grid,
  Paper,
  TableContainer, Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { AddCircle, Check, Close, CloudDownload, RemoveCircle, School } from '@material-ui/icons'

import actions from '../../actions/batch.actions'
import revokedActions from '../../actions/revoked.actions'
import confirmationActions from '../../actions/confirmation.actions'
import constants from '../../constants/batches.constants'
import CertificateDialog from '../organisms/CertificateDialog'
import ConfirmationDialog from '../organisms/ConfirmationDialog'

export default function Batch ({ match }) {
  const dispatch = useDispatch()
  const batchReducer = useSelector(state => state.batchReducer)
  const certificateReducer = useSelector(state => state.certificateReducer)
  const revokedReducer = useSelector(state => state.revokedReducer)

  React.useEffect(() => {
    dispatch(actions.get(match.params.id))
    dispatch(revokedActions.get())
  }, [dispatch, match.params.id])

  if (batchReducer.status === constants.STATUS.EMPTY) {
    return null
  }

  const { certificates } = JSON.parse(batchReducer.certificates)
  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }
  const isRevoked = certificate => {
    return revokedReducer.revoked.findIndex(e => e.certificateId === certificate.id) > -1
  }
  const handleSet = certificate => {
    dispatch(revokedActions.set(certificate.id, 'Revoked by the Issuer'))
    dispatch(confirmationActions.create('Revoke certificate?'))
  }
  const handleRevoke = () => {
    dispatch(revokedActions.create({
      certificateId: revokedReducer.certificateId,
      revocationReason: revokedReducer.revocationReason
    }))
  }
  const handleCancel = () => {
    dispatch(confirmationActions.reset())
    dispatch(revokedActions.cancel())
  }
  const handleUnrevoke = certificate => {
    const revoked = revokedReducer.revoked.find(e => e.certificateId === certificate.id)
    dispatch(revokedActions.destroy(revoked.id))
  }

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1'>
            {`Batch #${match.params.id}`}
          </Typography>
          <Typography gutterBottom>Created {formatRelative(fromUnixTime(batchReducer.created), new Date())}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Certificate name</TableCell>
                  <TableCell>Recipient</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {certificates.length > 0 && certificates.map((certificate, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {certificate.badge.name}
                    </TableCell>
                    <TableCell>
                      {`${certificate.recipientProfile.name} (${certificate.recipient.identity})`}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => dispatch(actions.getCertificate(certificate))}
                        startIcon={<School />}
                        color='primary'
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleDownload(certificate)}
                        startIcon={<CloudDownload />}
                        color='primary'
                      >
                        Download
                      </Button>
                      {
                        isRevoked(certificate)
                          ? (
                            <Button
                              onClick={() => handleUnrevoke(certificate)}
                              startIcon={<AddCircle />}
                            >
                              Unrevoke
                            </Button>
                          )
                          : (
                            <Button
                              onClick={() => handleSet(certificate)}
                              startIcon={<RemoveCircle />}
                            >
                              Revoke
                            </Button>
                          )
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <ConfirmationDialog
        actions={
          <>
            <Button
              onClick={() => handleCancel()}
              startIcon={<Close />}
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleRevoke()}
              startIcon={<Check />}
              color='primary'
            >
              Revoke
            </Button>
          </>
        }
      />
      {certificateReducer.id > 0 && <CertificateDialog />}
    </>
  )
}
