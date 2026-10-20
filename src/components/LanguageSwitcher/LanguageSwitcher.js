import styles from './LanguageSwitcher.module.css'

import React from 'react'
import { useLang } from '../../i18n/LanguageContext'

export default function LanguageSwitcher() {
	const { lang, setLang } = useLang()
	return (
		<div className={styles['language-switch']} aria-label="Language">
			{['ua', 'en'].map((item) => (
				<button
					key={item}
					type="button"
					className={lang === item ? styles.active : undefined}
					aria-pressed={lang === item}
					onClick={() => setLang(item)}
				>
					{item.toUpperCase()}
				</button>
			))}
		</div>
	)
}
