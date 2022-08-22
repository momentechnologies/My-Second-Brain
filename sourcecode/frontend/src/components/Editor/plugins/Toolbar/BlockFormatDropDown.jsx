import React from 'react';
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
} from 'lexical';
import { $wrapLeafNodesInElements } from '@lexical/selection';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import {
    INSERT_CHECK_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    INSERT_UNORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createCodeNode } from '@lexical/code';
import { ListItemIcon, ListItemText, MenuItem, Select } from '@mui/material';
import { ContentCut, FormatListBulleted } from '@mui/icons-material';

const BlockFormatDropDown = ({ editor, blockType }) => {
    const formatParagraph = () => {
        if (blockType !== 'paragraph') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () =>
                        $createParagraphNode()
                    );
                }
            });
        }
    };

    const formatHeading = (headingSize) => {
        if (blockType !== headingSize) {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () =>
                        $createHeadingNode(headingSize)
                    );
                }
            });
        }
    };

    const formatBulletList = () => {
        if (blockType !== 'bullet') {
            editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatCheckList = () => {
        if (blockType !== 'check') {
            editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatNumberedList = () => {
        if (blockType !== 'number') {
            editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
        } else {
            editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
        }
    };

    const formatQuote = () => {
        if (blockType !== 'quote') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $wrapLeafNodesInElements(selection, () =>
                        $createQuoteNode()
                    );
                }
            });
        }
    };

    const formatCode = () => {
        if (blockType !== 'code') {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    if (selection.isCollapsed()) {
                        $wrapLeafNodesInElements(selection, () =>
                            $createCodeNode()
                        );
                    } else {
                        const textContent = selection.getTextContent();
                        const codeNode = $createCodeNode();
                        selection.insertNodes([codeNode]);
                        selection.insertRawText(textContent);
                    }
                }
            });
        }
    };

    console.log(blockType);
    return (
        <Select
            value={blockType}
            onChange={(e) => {
                const mapping = {
                    paragraph: formatParagraph,
                    h1: () => formatHeading('h1'),
                    h2: () => formatHeading('h2'),
                    h3: () => formatHeading('h3'),
                    bullet: formatBulletList,
                    number: formatNumberedList,
                    check: formatCheckList,
                    quote: formatQuote,
                    code: formatCode,
                };

                if (mapping[e.target.value]) {
                    mapping[e.target.value]();
                }
            }}
        >
            <MenuItem
                value="paragraph"
                sx={{
                    display: 'flex',
                }}
            >
                <ListItemIcon>
                    <ContentCut fontSize="small" />
                </ListItemIcon>
                <span>Normal</span>
            </MenuItem>
            <MenuItem value="h1">Heading 1</MenuItem>
            <MenuItem value="h2">Heading 2</MenuItem>
            <MenuItem value="h3">Heading 3</MenuItem>
            <MenuItem value="bullet">
                <ListItemIcon>
                    <FormatListBulleted fontSize="small" />
                </ListItemIcon>
                <span>Bullet List</span>
            </MenuItem>
            <MenuItem value="number">Numbered List</MenuItem>
            <MenuItem value="check">Check List</MenuItem>
            <MenuItem value="quote">Quote</MenuItem>
            <MenuItem value="code">Code Block</MenuItem>
        </Select>
    );
};

export default BlockFormatDropDown;
