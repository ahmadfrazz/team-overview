const NoData = ({ text = "No record found" }: { text?: string }) => {
  return (
    <p className="min-h-40 grid place-items-center h-full text-muted-foreground text-sm">
      {text}
    </p>
  );
};

export default NoData;
