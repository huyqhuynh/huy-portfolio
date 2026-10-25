import SegmentationDemo from '../SegmentationDemo'
import CaseShell, { Block, NoteGrid } from '../CaseShell'

export default function Case3Sql() {
  return (
    <CaseShell
      title="SQL-Powered Audience Segmentation"
      summary="Selecting the right audience is part of email development. This query pulls opted-in members who have gone quiet, then narrows by tier and engagement."
      skills={['SQL', 'Query Activities', 'Data extensions', 'Segmentation']}
    >
      <Block title="Try it · change the filters and watch the query and results update">
        <SegmentationDemo />
      </Block>

      <Block title="How to read the query">
        <NoteGrid notes={[
          { title: 'Consent first', body: 'OptIn = 1 is always present. Every other filter narrows from the consented base.' },
          { title: 'Lapsed buyers', body: 'LastPurchaseDate older than the chosen window finds people worth a re-engagement message.' },
          { title: 'Engagement guard', body: 'An optional recent-open filter avoids mailing long-dormant addresses and protects deliverability.' },
          { title: 'Output is a target list', body: 'In Marketing Cloud a Query Activity writes these rows into a data extension that a send or journey reads.' },
        ]} />
      </Block>

      <Block title="Assumptions">
        <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-muted marker:text-cyan">
          <li>A Members data extension exists with OptIn, LoyaltyTier, LastPurchaseDate, and LastOpenDate fields.</li>
          <li>OptIn is kept current by a preference center or consent source.</li>
          <li>Suppression and global exclusions are applied at send time, outside this query.</li>
          <li>All names, fields, and rows here are synthetic. The table uses example.com addresses.</li>
        </ul>
      </Block>
    </CaseShell>
  )
}
