import {ListItemBuilder} from 'sanity/desk'
import defineStructure from '../utils/defineStructure'
import Iframe from 'sanity-plugin-iframe-pane'
import previewConfig from '../config/preview'

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title('Home')
    .schemaType('home')
    .child(
      S.document()
        .title('Home')
        .schemaType('home')
        .documentId('home')
        .views([
          S.view.form(),
          S.view
            .component(Iframe)
            .options({
              url: previewConfig.url,
            })
            .title('Preview'),
        ])
    ),
)
