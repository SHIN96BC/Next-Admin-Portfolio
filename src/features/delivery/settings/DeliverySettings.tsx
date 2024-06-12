'use client'

import {Box, FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, SelectChangeEvent} from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import MainCard from "@Src/components/common/cards/MainCard";
import CommonSelectBox from "@Src/components/select/CommonSelectBox";
import {useCallback, useEffect, useState} from "react";
import {
  DELIVERY_TYPE_BASE_LABEL,
  DELIVERY_TYPE_BASE_VALUE, DELIVERY_TYPE_CONDITION_LABEL, DELIVERY_TYPE_CONDITION_VALUE,
  DELIVERY_TYPE_FREE_LABEL,
  DELIVERY_TYPE_FREE_VALUE
} from "@Src/constants/delivery/setting";
import {FormattedMessage, useIntl} from "react-intl";
import {useFindByDelivery} from "@Src/services/delivery/useDeliveryService";

const deliveryOptions = [
  {
    value: DELIVERY_TYPE_FREE_VALUE,
    label: DELIVERY_TYPE_FREE_LABEL,
  },
  {
    value: DELIVERY_TYPE_BASE_VALUE,
    label: DELIVERY_TYPE_BASE_LABEL,
  },
  {
    value: DELIVERY_TYPE_CONDITION_VALUE,
    label: DELIVERY_TYPE_CONDITION_LABEL,
  },
];

export default function DeliverySettings() {
  const intl = useIntl();
  const [deliveryType, setDeliveryType] = useState<string>(DELIVERY_TYPE_FREE_VALUE);
  const [distanceType, setDistanceType] = useState<string>('DEA');

  const { data } = useFindByDelivery();

  const handleChangeDeliveryType = useCallback((event: SelectChangeEvent) => {
    setDeliveryType(event.target.value);
  }, [setDeliveryType]);

  const handleChangeDistanceType = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setDistanceType(event.target.value);
  }, [setDistanceType]);

  return (
    <Box>
      {/* Admin UI */}
      <MainCard>
        <Box>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
              <Typography variant="h5">
                <FormattedMessage id="deliverySetting.deliveryFee.title" />
              </Typography>

              <TextField
                id="outlined-basic-delivery"
                sx={{ minWidth: 400 }}
                value={intl.formatMessage({ id: 'deliverySetting.deliveryFee.base' })}
                disabled
              />
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
              <Typography variant="h5">
                <FormattedMessage id="deliverySetting.baseFee" />
              </Typography>

              {/*<Box position="relative">*/}
              {/*  <Box position="absolute" left={7} top={'25%'}>*/}
              {/*    ₱*/}
              {/*  </Box>*/}
                <TextField
                  id="outlined-basic-base"
                  sx={{
                    minWidth: 400,
                    // '& input': {
                    //   padding: '10.5px 14px 10.5px 20px'
                    // },
                    '& input': {
                      textAlign: 'right',
                    },
                  }}
                  InputProps={{
                    startAdornment:
                      <InputAdornment
                        position="start"
                        sx={{
                          '& p': {
                            color: '#000000'
                          },
                        }}>₱</InputAdornment>,
                  }}
                />
              {/*</Box>*/}
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>
              <Typography variant="h5">
                <FormattedMessage id="deliverySetting.kmFee" />
              </Typography>

              <TextField
                id="outlined-basic-additional"
                sx={{
                  minWidth: 400,
                  '& input': {
                    textAlign: 'right',
                  },
                }}
                InputProps={{
                  startAdornment:
                    <InputAdornment
                      position="start"
                      sx={{
                        '& p': {
                          color: '#000000'
                        },
                      }}>₱</InputAdornment>,
                }}
              />
            </Grid>

          </Grid>
        </Box>
      </MainCard>

      {/* Store UI */}
      {/*<Box pt={5}>*/}
      {/*  <MainCard>*/}
      {/*    <Box>*/}
      {/*      <Grid container>*/}
      {/*        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>*/}
      {/*          <Typography variant="h5">*/}
      {/*            Delivery Fee*/}
      {/*          </Typography>*/}

      {/*          <CommonSelectBox*/}
      {/*            minWidth={400}*/}
      {/*            value={deliveryType}*/}
      {/*            options={deliveryOptions}*/}
      {/*            handleChange={handleChangeDeliveryType}*/}
      {/*          />*/}

      {/*        </Grid>*/}

      {/*        {*/}
      {/*          (deliveryType === DELIVERY_TYPE_BASE_VALUE || deliveryType === DELIVERY_TYPE_CONDITION_VALUE) &&*/}
      {/*            <>*/}
      {/*              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>*/}
      {/*                <Typography variant="h5">*/}
      {/*                  Base Delivery Fee*/}
      {/*                </Typography>*/}

      {/*                <TextField*/}
      {/*                  id="outlined-basic-base"*/}
      {/*                  disabled*/}
      {/*                  value={'49'}*/}
      {/*                  sx={{*/}
      {/*                    minWidth: 400,*/}
      {/*                    '& input': {*/}
      {/*                      textAlign: 'right',*/}
      {/*                    },*/}
      {/*                  }}*/}
      {/*                  InputProps={{*/}
      {/*                    startAdornment:*/}
      {/*                      <InputAdornment*/}
      {/*                        position="start"*/}
      {/*                        sx={{*/}
      {/*                          '& p': {*/}
      {/*                            color: '#000000'*/}
      {/*                          },*/}
      {/*                        }}>₱</InputAdornment>,*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Grid>*/}

      {/*              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>*/}
      {/*                <Typography variant="h5">*/}
      {/*                  Additional Fee Per Km*/}
      {/*                </Typography>*/}

      {/*                <TextField*/}
      {/*                  id="outlined-basic-additional"*/}
      {/*                  disabled*/}
      {/*                  value={'5'}*/}
      {/*                  sx={{*/}
      {/*                    minWidth: 400,*/}
      {/*                    '& input': {*/}
      {/*                      textAlign: 'right',*/}
      {/*                    },*/}
      {/*                  }}*/}
      {/*                  InputProps={{*/}
      {/*                    startAdornment:*/}
      {/*                      <InputAdornment*/}
      {/*                        position="start"*/}
      {/*                        sx={{*/}
      {/*                          '& p': {*/}
      {/*                            color: '#000000'*/}
      {/*                          },*/}
      {/*                        }}>₱</InputAdornment>,*/}
      {/*                  }}*/}
      {/*                />*/}
      {/*              </Grid>*/}
      {/*            </>*/}
      {/*        }*/}

      {/*        {*/}
      {/*          deliveryType === DELIVERY_TYPE_CONDITION_VALUE &&*/}
      {/*            <>*/}
      {/*              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>*/}
      {/*                <Typography variant="h5">*/}
      {/*                  Free Delivery Conditions*/}
      {/*                </Typography>*/}

      {/*                <Box display="flex" alignItems="center">*/}
      {/*                  <Typography pr={2}>*/}
      {/*                    If Purchase Exceeds*/}
      {/*                  </Typography>*/}

      {/*                  <TextField*/}
      {/*                    id="outlined-basic-additional"*/}
      {/*                    sx={{*/}
      {/*                      minWidth: 400,*/}
      {/*                      '& input': {*/}
      {/*                        textAlign: 'right',*/}
      {/*                      },*/}
      {/*                    }}*/}
      {/*                    InputProps={{*/}
      {/*                      startAdornment:*/}
      {/*                        <InputAdornment*/}
      {/*                          position="start"*/}
      {/*                          sx={{*/}
      {/*                            '& p': {*/}
      {/*                              color: '#000000'*/}
      {/*                            },*/}
      {/*                          }}>₱</InputAdornment>,*/}
      {/*                    }}*/}
      {/*                  />*/}
      {/*                </Box>*/}
      {/*              </Grid>*/}
      {/*              <Grid item xs={12} sm={12} md={12} lg={12} xl={12} pb={2}>*/}
      {/*                <Typography variant="h5">*/}
      {/*                  Distance Surcharge Fee*/}
      {/*                </Typography>*/}

      {/*                <Box>*/}
      {/*                  <FormControl component="fieldset">*/}
      {/*                    <RadioGroup*/}
      {/*                      aria-label="gender"*/}
      {/*                      defaultValue="female"*/}
      {/*                      name="radio-buttons-group"*/}
      {/*                      row*/}
      {/*                      value={distanceType}*/}
      {/*                      onChange={handleChangeDistanceType}*/}
      {/*                    >*/}
      {/*                      <FormControlLabel value="ACT" control={<Radio />} label="Activate" />*/}
      {/*                      <FormControlLabel value="DEA" control={<Radio />} label="Deactivate" />*/}
      {/*                    </RadioGroup>*/}
      {/*                  </FormControl>*/}
      {/*                </Box>*/}

      {/*                {*/}
      {/*                  distanceType === 'ACT' &&*/}
      {/*                    <Box>*/}
      {/*                      <Box>*/}
      {/*                        <Typography>*/}
      {/*                          Threshold Distance (Km)*/}
      {/*                        </Typography>*/}

      {/*                        <TextField*/}
      {/*                          id="outlined-basic-additional"*/}
      {/*                          sx={{*/}
      {/*                            minWidth: 400,*/}
      {/*                            '& input': {*/}
      {/*                              textAlign: 'right',*/}
      {/*                            },*/}
      {/*                          }}*/}
      {/*                          InputProps={{*/}
      {/*                            endAdornment:*/}
      {/*                              <InputAdornment*/}
      {/*                                position="end"*/}
      {/*                                sx={{*/}
      {/*                                  '& p': {*/}
      {/*                                    color: '#000000'*/}
      {/*                                  },*/}
      {/*                                }}>Km</InputAdornment>,*/}
      {/*                          }}*/}
      {/*                        />*/}
      {/*                      </Box>*/}

      {/*                      <Box>*/}
      {/*                        <Typography>*/}
      {/*                          Additional Fee Per Km Beyond Threshold Distance*/}
      {/*                        </Typography>*/}

      {/*                        <TextField*/}
      {/*                          id="outlined-basic-additional"*/}
      {/*                          sx={{*/}
      {/*                            minWidth: 400,*/}
      {/*                            '& input': {*/}
      {/*                              textAlign: 'right',*/}
      {/*                            },*/}
      {/*                          }}*/}
      {/*                          InputProps={{*/}
      {/*                            startAdornment:*/}
      {/*                              <InputAdornment*/}
      {/*                                position="start"*/}
      {/*                                sx={{*/}
      {/*                                  '& p': {*/}
      {/*                                    color: '#000000'*/}
      {/*                                  },*/}
      {/*                                }}>₱</InputAdornment>,*/}
      {/*                          }}*/}
      {/*                        />*/}
      {/*                      </Box>*/}
      {/*                    </Box>*/}
      {/*                }*/}
      {/*              </Grid>*/}
      {/*            </>*/}
      {/*        }*/}

      {/*      </Grid>*/}
      {/*    </Box>*/}
      {/*  </MainCard>*/}
      {/*</Box>*/}
    </Box>
  );
}