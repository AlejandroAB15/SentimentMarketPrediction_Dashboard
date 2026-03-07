type Props = {
  title: string
  description?: string
}

export default function SectionHeader({ title, description }: Props) {

  return (
    <div className="flex flex-col gap-1">

      <span className="text-lg font-medium text-text/80">
        {title}
      </span>

      {description && (
        <span className="text-base text-text/50">
          {description}
        </span>
      )}

    </div>
  )

}