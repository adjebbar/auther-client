import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { formatRelative, parseISO } from 'date-fns'
import slugify from 'slugify'
import { saveAs } from 'file-saver'
import {
  Button,
  Card, CardContent,
  Grid,
  Table, TableBody, TableCell, TableHead, TableRow,
  Typography
} from '@material-ui/core'
import { CloudDownload, Link, School } from '@material-ui/icons'

import actions from '../../actions/certificates.actions'
import constants from '../../constants/certificates.constants'
import CertificateDialog from '../organisms/CertificateDialog'

export default function CertificatesIssuer () {
  const dispatch = useDispatch()
  const certificatesReducer = useSelector(state => state.certificatesReducer)
  const certificateReducer = useSelector(state => state.certificateReducer)

  const handleDownload = certificate => {
    saveAs(
      new window.Blob([JSON.stringify(certificate)], { type: 'application/json;charset=utf-8' }),
      slugify(`${certificate.badge.name} ${certificate.recipientProfile.name}.json`)
    )
  }

  React.useEffect(() => {
    dispatch(actions.getAll())
  }, [dispatch])

  return (
    <>
      <Grid container spacing={5} justify='center'>
        <Grid item xs={12} align='center'>
          <Typography variant='h1' gutterBottom>Certificates</Typography>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Issuer</TableCell>
                    <TableCell>Recipient</TableCell>
                    <TableCell>Certificate</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificatesReducer.certificates.map((certificate, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatRelative(parseISO(certificate.createdAt), new Date())}</TableCell>
                      <TableCell>{certificate.Issuer.email}</TableCell>
                      <TableCell>{certificate.Recipient.email}</TableCell>
                      <TableCell>{certificate.json.badge.name}</TableCell>
                      <TableCell>
                        {certificate.status === constants.STATUS.SHARED ? 'Shared' : 'Not shared'}
                      </TableCell>
                      <TableCell>
                        <Button
                          onClick={() => handleDownload(certificate.json)}
                          startIcon={<CloudDownload />}
                          color='primary'
                        >
                          Download
                        </Button>
                        <Button
                          onClick={() => dispatch(actions.setCertificate(certificate))}
                          startIcon={<School />}
                          color='primary'
                        >
                          View
                        </Button>
                        {certificate.status === constants.STATUS.SHARED && (
                          <Button
                            href={`/certificates/shared/${certificate.uuid}`}
                            target='shared'
                            rel='noopener noreferrer'
                            startIcon={<Link />}
                            color='primary'
                          >
                            Link
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {certificateReducer.id > 0 && <CertificateDialog />}
    </>
  )
}