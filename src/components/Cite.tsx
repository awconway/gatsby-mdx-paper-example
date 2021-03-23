import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Manager, Popper, Reference } from 'react-popper'
import styled from 'styled-components'
import { Arrow } from './Arrow'
import { BibliographyItem } from './Bibliography'
import { BibliographyContext } from './BibliographyProvider'

export const Cite: React.FC<{ items: string }> = ({ items }) => {
  const [keys] = React.useState<string[]>(items.split(/\s*;\s*/))
  const [isOpen, setOpen] = React.useState(false)
  const [citedItems, setCitedItems] = React.useState<string[]>()
  const [label, setLabel] = React.useState<string>()
  const [addedCitation, setAddedCitation] = React.useState(false)

  const {
    addCitation,
    labels,
    bibliographyItems,
    citedKeys,
  } = React.useContext(BibliographyContext)

  React.useEffect(() => {
    if (bibliographyItems && citedKeys && labels) {
      setLabel(labels[JSON.stringify(keys)])
      setCitedItems(
        keys
          .sort((a, b) => citedKeys.indexOf(a) - citedKeys.indexOf(b))
          .map(key => bibliographyItems[key])
      )
    }
  }, [bibliographyItems, citedKeys, labels, keys])

  React.useEffect(() => {
    addCitation(keys)
    setAddedCitation(true)
  }, [addCitation, keys])

  if (!addedCitation) return null

  return (
    <Manager>
      <Reference>
        {({ ref }) => (
          <Citation ref={ref} onClick={() => setOpen(!isOpen)}>
            {label ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: label,
                }}
              />
            ) : (
              <sup>…</sup>
            )}
          </Citation>
        )}
      </Reference>

      {isOpen &&
        citedItems &&
        ReactDOM.createPortal(
          <Popper positionFixed={true}>
            {({ ref, style, placement, arrowProps }) => (
              <div ref={ref} style={style} data-placement={placement}>
                <CitedItems>
                  {citedItems.map(citedItem => (
                    <BibliographyItem
                      key={citedItem}
                      dangerouslySetInnerHTML={{
                        __html: citedItem,
                      }}
                    />
                  ))}
                </CitedItems>

                <Arrow
                  ref={arrowProps.ref}
                  style={arrowProps.style}
                  data-placement={placement}
                />
              </div>
            )}
          </Popper>,
          document.getElementById('popper') as HTMLDivElement
        )}
    </Manager>
  )
}

// TODO: style only sup, move left when sup

const Citation = styled.span`
  cursor: pointer;
  line-height: 0;
  padding: 0 4px;
  border-radius: 4px;

  sup {
    font-size: 75%;
  }
`

const CitedItems = styled.div`
  background-color: #fff;
  max-width: 65ch;
  box-shadow: 0 1px 3px #ddd;
  border-radius: 4px;
  padding: 16px;
  border: 1px solid #eee;
  font-size: 80%;
`
