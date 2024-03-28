

c=0

  if [ "$#" -eq 0 ]; then
        echo "No arguments"
        break;
    fi

for args in $@
do
echo $args
 c=$((c+1))

 
 if [ "$c" -gt 2 ]; then
    break;
 fi   
      
done

