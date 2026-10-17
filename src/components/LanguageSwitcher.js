import React from 'react'
import { useLang } from '../i18n/LanguageContext'
export default function LanguageSwitcher() {
	const { lang, setLang } = useLang()
	return (
		<div className="language-switch" aria-label="Language">
			{['ua', 'en'].map((item) => (
				<button
					key={item}
					type="button"
					className={lang === item ? 'active' : ''}
					aria-pressed={lang === item}
					onClick={() => setLang(item)}
				>
					{item.toUpperCase()}
				</button>
			))}
		</div>
	)
}
