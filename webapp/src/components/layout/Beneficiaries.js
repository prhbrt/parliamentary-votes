import React from 'react';
import { Grid, TextField } from '@mui/material';
import { TableVirtuoso } from 'react-virtuoso';
import tinygradient from 'tinygradient';
import { useTranslation } from 'react-i18next';
import { useData } from '../../hooks/useData';

function Beneficiaries() {
    const { t } = useTranslation();
    const { all_beneficiaries, beneficiaries, parties, setFilterBeneficiaries} = useData();
    if (all_beneficiaries.length === 0)
        return <p>{t("No beneficiaries")}</p>
    
    return (
            <TableVirtuoso
                style={{height: 'calc(100vh - 2.5em - 100px)', width: '100%', borderSpacing: '1px', borderCollapse: 'separate'}}
                className={`beneficiaries-virtuoso`}
                data={all_beneficiaries}
                fixedHeaderContent={() => (
                    <tr style={{ background: 'white'}}>
                        <th style={{ width: 250, position: 'sticky', left: 0}}>
                            <TextField
                                key="filter-beneficiaries"
                                style={{ flexGrow: 1}}
                                id="filter-beneficiaries"
                                label={t("Filter")}
                                placeholder={t("KeyFilterwords")}
                                variant="standard"
                                onChange={e => setFilterBeneficiaries(e.target.value)}
                            />
                        </th>
                        {parties.map(party => <th key={`${party}-header`} style={{width: '150px'}}>{party}</th>)}
                    </tr>
                )}
                itemContent={(index, beneficiary) => {
                    const maxValue = Object.values(beneficiaries).map(x => x[beneficiary]).reduce((a, b) => Math.max(a, b), 0);
                    const colors = tinygradient([
                        {color: '#009CEF', pos: 0},
                        {color: '#dc002d', pos: 1},
                    ]).rgb(maxValue + 1).map(color => color.setAlpha(0.75).toRgbString());
                    
                    return <>
                        <th key="beneficiary" style={{textAlign: 'right', paddingRight: '5px', position: 'sticky', left: 0, background: 'white'}}>{beneficiary}</th>
                        {parties.map(party => {
                            const number = beneficiaries[party][beneficiary];
                            return <td key={party} style={{textAlign: 'right', paddingRight: '5px', backgroundColor: colors[number], color: 'white'}}>{(new Intl.NumberFormat().format(number)).split(',').map(x => <>&nbsp;{x}</>)}</td>
                        })}
                    </>
                }}
            />
    );
}

export default Beneficiaries;