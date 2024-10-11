const { Fragment } = React
const { Link } = ReactRouterDOM

import { MailSort } from "./MailSort.jsx"
import { MailPreview } from "./MailPreview.jsx"

export function MailList({
    mails, filterBy, sortBy, folder, isLoading, onOpenMailEdit,
    onRemoveMail, onToggleStarred, onSetFilterBy, onSetSortBy
}) {

    function getEmptyFolderMessage() {
        switch (folder) {
            case 'inbox':
                return 'Your inbox is empty.'
            case 'sent':
                return <Fragment>No sent messages! <a href="#" className="send-link" onClick={onOpenMailEdit}>Send</a> one now!</Fragment>
            case 'starred':
                return 'No starred messages. Stars let you give messages a special status to make them easier to find. ' + 
                       'To star a message, click on the star outline beside any message or conversation.'
            case 'trash':
                return 'No conversations in Trash folder.'
            case 'drafts':
                return 'You don\'t have any saved drafts.\n' +
                       'Saving a draft allows you to keep a message you aren\'t ready to send yet.'
            default:
                return `No mails in the ${folder} folder.`
        }
    }
    
    return (
        <React.Fragment>
            <MailSort 
                onSetSortBy={onSetSortBy}
                sortBy={sortBy} 
                onSetFilterBy={onSetFilterBy} 
                filterBy={filterBy} 
            />

            <ul className="mail-list clean-list">
                {isLoading && (
                    <span className="loader1"></span>
                )}

                {!isLoading && (!mails || mails.length === 0) && (
                    <div className="empty-folder-msg">{getEmptyFolderMessage()}</div>
                )}

                {!isLoading && mails && mails.length > 0 && (
                    mails.map(mail => (
                        <li key={mail.id}>
                            <Link to={`/mail/${mail.id}`}>
                                <MailPreview 
                                    mail={mail}
                                    onRemoveMail={onRemoveMail}
                                    onToggleStarred={onToggleStarred}
                                />
                            </Link>
                        </li>
                    ))
                )}
            </ul>
        </React.Fragment>
    )
}