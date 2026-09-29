/** Aparición suave al entrar en pantalla: marca el orden de lectura de cada sección.
 *
 *  Es solo CSS (animación ligada al scroll, ver `.reveal` en globals.css): el contenido
 *  está visible en el HTML desde el primer momento, sin esperar a JavaScript, así que
 *  no retrasa la carga ni esconde nada a Google. En navegadores sin soporte o con
 *  "reducir movimiento" activado, simplemente no se anima. */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode
  /** Desfase en segundos. Escalona elementos hermanos. */
  delay?: number
  className?: string
  as?: "div" | "li" | "section"
}) {
  return (
    <Tag className={`reveal ${className}`} style={delay ? ({ "--reveal-offset": `${Math.round(delay * 60)}px` } as React.CSSProperties) : undefined}>
      {children}
    </Tag>
  )
}
